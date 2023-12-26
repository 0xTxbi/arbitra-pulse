import "reflect-metadata";
import { Action, createExpressServer } from "routing-controllers";
import { AuthController } from "./controllers/AuthController";

import { verify } from "jsonwebtoken";
import { getCustomRepository } from "../utils/getCustomRepository";
import { User } from "arbitra-pulse-entities";

// set up express server
const app = createExpressServer({
	controllers: [AuthController],
	currentUserChecker: async (action: Action) => {
		return new Promise(async (resolve, reject) => {
			const authorizationHeader =
				action.request.headers["authorization"];
			if (authorizationHeader) {
				const token =
					authorizationHeader.match(
						/Bearer\s(\S+)/
					)[1];
				try {
					const decodedToken = verify(
						token,
						process.env.JWT_SECRET ||
							"your-secret-key"
					);
					if (decodedToken["userId"]) {
						const userRepository =
							getCustomRepository(
								User
							);
						const user =
							await userRepository.findOneBy(
								decodedToken[
									"userId"
								]
							);
						console.log(
							"User found:",
							user
						);
						resolve(user);
					} else {
						reject(
							new Error(
								"User ID is not defined in the token"
							)
						);
					}
				} catch (error) {
					console.error(
						"Failed to verify token:",
						error
					);
					reject(error);
				}
			} else {
				resolve(undefined);
			}
		});
	},
	cors: true,
});

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Authentication service is running on port ${PORT}`);
});
