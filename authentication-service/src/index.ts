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
		const token = action.request.headers["authorization"];
		if (token) {
			const userRepository = getCustomRepository(User);
			const decodedToken = verify(
				token,
				process.env.JWT_SECRET || "your-secret-key"
			);
			const user = await userRepository.findOne(
				decodedToken["userId"]
			);
			return user;
		}
	},
});

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Authentication service is running on port ${PORT}`);
});
