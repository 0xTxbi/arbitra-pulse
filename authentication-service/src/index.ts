import "reflect-metadata";
import { Action, createExpressServer } from "routing-controllers";
import { AuthController } from "./controllers/AuthController";
import { getCustomRepository } from "../../shared/utils/getCustomRepository";
import { User } from "../entities/User";
import { verify } from "jsonwebtoken";

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
					// check if userId is defined
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
						resolve(user);
					} else {
						// handle the case where userId is not defined
						reject(
							new Error(
								"User ID is not defined in the token"
							)
						);
					}
				} catch (error) {
					reject(error);
				}
			} else {
				resolve(undefined);
			}
		});
	},
});

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Authentication service is running on port ${PORT}`);
});
