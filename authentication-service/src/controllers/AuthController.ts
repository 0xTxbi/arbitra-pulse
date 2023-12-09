import {
	JsonController,
	Post,
	Body,
	UseBefore,
	Authorized,
	Put,
	CurrentUser,
	Get,
	Param,
	Delete,
} from "routing-controllers";
import {
	IsNotEmpty,
	IsEmail,
	MinLength,
	validateOrReject,
} from "class-validator";

import { getCustomRepository } from "../../../shared/utils/getCustomRepository";
import { User } from "../../entities/User";
import { profileUpdateRateLimit } from "../middlewares/RateLimitMiddleware";
import { AuthResponse } from "../../../types";
import { Watchlist } from "../../entities/Watchlist";

// create user dto
class CreateUserDto {
	@IsNotEmpty({ message: "Username is required" })
	username: string;

	@IsNotEmpty({ message: "Email is required" })
	@IsEmail({}, { message: "Invalid email format" })
	email: string;

	@IsNotEmpty({ message: "Password is required" })
	@MinLength(8, {
		message: "Password must be at least 8 characters long",
	})
	hashedPassword: string;
}

// login user dto
class LoginUserDto {
	@IsNotEmpty({ message: "Username or email is required" })
	usernameOrEmail: string;

	@IsNotEmpty({ message: "Password is required" })
	password: string;
}

// update user dto
export class UpdateUserDto {
	@IsNotEmpty({ message: "Email is required" })
	@IsEmail({}, { message: "Invalid email format" })
	email?: string;

	@IsNotEmpty({ message: "Username is required" })
	username?: string;
}

@JsonController()
export class AuthController {
	private readonly userRepository = getCustomRepository(User);

	@Post("/register")
	async register(@Body() userData: CreateUserDto): Promise<AuthResponse> {
		try {
			// validate user input using class-validator
			await validateOrReject(userData);

			// check if the username or email is already registered
			const existingUser = await this.userRepository.findOne({
				where: [
					{ username: userData.username },
					{ email: userData.email },
				],
			});

			if (existingUser) {
				throw new Error(
					"Username or email already exists."
				);
			}

			// create a new user
			const newUser = this.userRepository.create(userData);

			// save the newly created user to the database
			await this.userRepository.save(newUser);

			// generate a JWT token for the new user
			const token = newUser.generateJWT();

			// return success message, user details, and JWT
			return {
				message: "Registered successfully",
				successCode: 201,
				userDetails: {
					id: newUser.id,
					username: newUser.username,
					email: newUser.email,
				},
				token: token,
			};
		} catch (errors) {
			console.error("Registration failed:", errors);
			return {
				message: "Registration failed. Please check your input and try again.",
				successCode: 500,
			};
		}
	}

	// @UseBefore(authRateLimit)
	@Post("/login")
	async login(@Body() loginData: LoginUserDto): Promise<AuthResponse> {
		try {
			// validate user input using class-validator
			await validateOrReject(loginData);

			// find the user by username or email
			const user = await this.userRepository.findOne({
				where: [
					{ username: loginData.usernameOrEmail },
					{ email: loginData.usernameOrEmail },
				],
			});

			// throw an error if the user isn't found or the password is incorrect
			if (
				!user ||
				!(await user.compareCredentials(
					loginData.usernameOrEmail,
					loginData.password
				))
			) {
				return {
					message: "Authentication failed. Please check your input and try again.",
					successCode: 401,
				};
			}

			// generate a JWT token for the authenticated user
			const token = user.generateJWT();

			return {
				message: "Authenticated successfully",
				successCode: 201,
				userDetails: {
					username: user.username,
					email: user.email,
				},
				token: token,
			};
		} catch (errors) {
			console.error("Login failed:", errors);
			return {
				message: "Authentication failed. Please check your input and try again.",
				successCode: 500,
			};
		}
	}

	@Authorized()
	@UseBefore(profileUpdateRateLimit)
	@Put("/profile")
	async updateProfile(
		@CurrentUser({ required: true }) currentUser: User,
		@Body() updateData: UpdateUserDto
	): Promise<{ message: string } | { error: string }> {
		try {
			// validate user input using class-validator
			await validateOrReject(updateData);

			// update the user's profile
			currentUser.email =
				updateData.email || currentUser.email;
			currentUser.username =
				updateData.username || currentUser.username;

			// save the updated user to the database
			await this.userRepository.save(currentUser);

			return { message: "Profile updated successfully" };
		} catch (errors) {
			console.error("Profile update failed:", errors);
			return {
				error: "Profile update failed. Please check your input and try again.",
			};
		}
	}

	@Get("/")
	async getCurrentUser(@CurrentUser({ required: false }) user: User) {
		if (!user) {
			console.log(user);
			return { isAuthenticated: false };
		}
		const { email, username, watchlist } = user;
		return {
			isAuthenticated: true,
			user: {
				email,
				username,
				watchlist,
			},
		};
	}

	@Get("/watchlist")
	async getWatchlist(
		@CurrentUser({ required: false }) user: User
	): Promise<Watchlist[]> {
		try {
			if (!user.watchlist) {
				throw new Error(
					"Watchlist is not defined for the current user"
				);
			}
			return user.watchlist;
		} catch (error) {
			console.error("Failed to retrieve watchlist:", error);
			return [];
		}
	}

	@Post("/watchlist/add/:symbol")
	async addToWatchlist(
		@CurrentUser({ required: true }) currentUser: User,
		@Param("symbol") symbol: string
	): Promise<{ message: string } | { error: string }> {
		try {
			const watchlistItem = new Watchlist();
			watchlistItem.symbol = symbol;
			watchlistItem.user = currentUser;

			await getCustomRepository(Watchlist).save(
				watchlistItem
			);

			return { message: `Added ${symbol} to your watchlist` };
		} catch (error) {
			console.error("Failed to add to watchlist:", error);
			return { error: "Failed to add to watchlist" };
		}
	}

	@Delete("/watchlist/remove/:symbol")
	async removeFromWatchlist(
		@CurrentUser({ required: true }) currentUser: User,
		@Param("symbol") symbol: string
	): Promise<{ message: string } | { error: string }> {
		try {
			const watchlistRepository =
				getCustomRepository(Watchlist);

			// utilise custom query to retrieve the watchlist entry to delete
			const watchlistItem = await watchlistRepository
				.createQueryBuilder("watchlist")
				.innerJoinAndSelect("watchlist.user", "user")
				.where("user.id = :userId", {
					userId: currentUser.id,
				})
				.andWhere("watchlist.symbol = :symbol", {
					symbol,
				})
				.getOne();

			if (!watchlistItem) {
				return {
					error: `Symbol ${symbol} not found in watchlist`,
				};
			}

			// remove the watchlist entry
			await watchlistRepository.remove(watchlistItem);

			return {
				message: `Removed ${symbol} from your watchlist`,
			};
		} catch (error) {
			console.error(
				"Failed to remove from watchlist:",
				error
			);
			return { error: "Failed to remove from watchlist" };
		}
	}
}
