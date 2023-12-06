import {
	JsonController,
	Post,
	Body,
	UseBefore,
	Authorized,
	Put,
	CurrentUser,
} from "routing-controllers";
import {
	IsNotEmpty,
	IsEmail,
	MinLength,
	validateOrReject,
} from "class-validator";

import { getCustomRepository } from "../../../shared/utils/getCustomRepository";
import { User } from "../../entities/User";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

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
@UseBefore(AuthMiddleware)
export class AuthController {
	private readonly userRepository = getCustomRepository(User);

	@Post("/register")
	async register(
		@Body() userData: CreateUserDto
	): Promise<{ token: string } | { error: string }> {
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
				return {
					error: "Username or email already exists.",
				};
			}

			// create a new user
			const newUser = this.userRepository.create(userData);

			// save the newly created user to the database
			await this.userRepository.save(newUser);

			// generate a JWT token for the new user
			const token = newUser.generateJWT();

			// respond with the token
			return { token };
		} catch (errors) {
			console.error("Registration failed:", errors);
			return {
				error: "Registration failed. Please check your input and try again.",
			};
		}
	}

	@Post("/login")
	async login(
		@Body() loginData: LoginUserDto
	): Promise<{ token: string } | { error: string }> {
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
					error: "Invalid username/email or password",
				};
			}

			// generate a JWT token for the authenticated user
			const token = user.generateJWT();

			// respond with the token
			return { token };
		} catch (errors) {
			console.error("Login failed:", errors);
			return {
				error: "Login failed. Please check your input and try again.",
			};
		}
	}

	@Authorized()
	@UseBefore(AuthMiddleware)
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

			// optionally, update other fields like password if needed

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
}
