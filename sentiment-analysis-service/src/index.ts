import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import SentimentService from "./services/SentimentService";
import { SentimentController } from "./controllers/SentimentController";

useContainer(Container);

const app = createExpressServer({
	controllers: [SentimentController],
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

const sentimentService = new SentimentService();

app.set("sentimentService", sentimentService);

app.listen(3003, () => {
	console.log("Sentiment Analysis Service is running on port 3003");
});
