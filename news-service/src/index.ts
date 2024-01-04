import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { NewsController } from "./controllers/NewsController";

const app = createExpressServer({
	controllers: [NewsController],
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
});

app.listen(3002, () => {
	console.log("the News Service is running on port 3002");
});
