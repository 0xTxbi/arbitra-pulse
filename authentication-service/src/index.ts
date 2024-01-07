import "reflect-metadata";
import { Action, createExpressServer, useContainer } from "routing-controllers";
import { AuthController } from "./controllers/AuthController";
import { verify } from "jsonwebtoken";
import { getCustomRepository } from "../utils/getCustomRepository";
import { User } from "arbitra-pulse-entities";
import Container from "typedi";
import { DashboardService } from "./services/Dashboard.service";

useContainer(Container);

const extractTokenFromHeader = (header: string | undefined): string | null => {
	if (!header) return null;
	const matchResult = header.match(/Bearer\s(\S+)/);
	return matchResult ? matchResult[1] : null;
};

const decodeAndVerifyToken = async (token: string | null): Promise<any> => {
	if (!token) throw new Error("Invalid Authorization header");
	try {
		return verify(
			token,
			process.env.JWT_SECRET || "your-secret-key"
		);
	} catch (error) {
		console.error("Failed to verify token:", error.message);
		throw error;
	}
};

const findUserById = async (userId): Promise<User | undefined> => {
	const userRepository = getCustomRepository(User);
	return await userRepository.findOne({
		where: {
			id: userId,
		},
	});
};

export const currentUserChecker = async (
	action: Action
): Promise<User | undefined> => {
	// routes that don't require authentication
	const publicRoutes = ["/register", "login"];

	// skip token verification for the public routes
	if (publicRoutes.includes(action.request.url)) {
		return undefined;
	}
	const authorizationHeader = action.request.headers["authorization"];
	const token = extractTokenFromHeader(authorizationHeader);
	const decodedToken = await decodeAndVerifyToken(token);
	if (decodedToken["userId"]) {
		return await findUserById(decodedToken["userId"]);
	} else {
		throw new Error("User ID is not defined in the token");
	}
};

// set up express server
const app = createExpressServer({
	controllers: [AuthController],
	cors: {
		origin: (origin, callback) => {
			const whitelist = [
				"http://localhost:3000",
				process.env.CLIENT_DOMAIN,
			];
			if (whitelist.indexOf(origin) !== -1 || !origin) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true,
	},
	currentUserChecker: currentUserChecker,
});

const dashboardService = new DashboardService();

app.set("dashboardService", dashboardService);

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Authentication service is running on port ${PORT}`);
});
