import "reflect-metadata";
import express from "express";
import { Action, useExpressServer } from "routing-controllers";
import { AuthController } from "./controllers/AuthController";

import { verify } from "jsonwebtoken";
import { getCustomRepository } from "../utils/getCustomRepository";
import { User } from "arbitra-pulse-entities";

import cors, { CorsOptions } from "cors";

// set up express server
const app = express();

// cors config
const corsOptions: CorsOptions = {
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
};

app.use(cors(corsOptions));

useExpressServer({
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
});

// add middleware to set cors headers
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", req.headers.origin);
	res.header("Access-Control-Allow-Credentials", "true");
	next();
});

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Authentication service is running on port ${PORT}`);
});
