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
			console.log(action.request);
			const cookies = action.request.cookies;
			if (cookies && cookies.jwt) {
				const userRepository =
					getCustomRepository(User);
				try {
					const decodedToken = verify(
						cookies.jwt,
						process.env.JWT_SECRET ||
							"your-secret-key"
					);
					const user =
						await userRepository.findOne(
							decodedToken["userId"]
						);
					resolve(user);
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
