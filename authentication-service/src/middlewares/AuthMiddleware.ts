import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";
import { verify, TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { getCustomRepository } from "../../utils/getCustomRepository";
import { User } from "arbitra-pulse-entities";

// extend Request interface
interface RequestWithUser extends Request {
	user: User;
}

@Middleware({ type: "before" })
export class AuthMiddleware implements ExpressMiddlewareInterface {
	async use(
		request: RequestWithUser,
		response: Response,
		next: NextFunction
	): Promise<void> {
		// extract the JWT token from the Authorization header
		const authorizationHeader =
			request.headers["authorization"] ||
			request.headers["Authorization"];

		if (!authorizationHeader) {
			response.status(401).json({
				error: "Unauthorized - Missing Authorization header",
			});
			return;
		}

		const token = (authorizationHeader as string).match(
			/Bearer\s(\S+)/
		)[1];

		try {
			// verify the token's signature and decode the payload
			const decodedToken = verify(
				token,
				process.env.JWT_SECRET || "your-secret-key"
			);

			// attach the user's information to the request object
			const userRepository = getCustomRepository(User);
			const user = await userRepository.findOne(
				decodedToken["userId"]
			);

			if (!user) {
				throw new Error("User not found");
			}

			request.user = user;

			// proceed to the next middleware or route handler
			next();
		} catch (error) {
			if (error instanceof TokenExpiredError) {
				response.status(401).json({
					error: "Unauthorized - Token expired",
				});
			} else if (error instanceof JsonWebTokenError) {
				response.status(401).json({
					error: "Unauthorized - Token is invalid",
				});
			} else {
				console.error("Authentication failed:", error);
				response.status(401).json({
					error: "Unauthorized - Invalid token",
				});
			}
		}
	}
}
