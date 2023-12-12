import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import SentimentService from "./services/SentimentService";
import { SentimentController } from "./controllers/SentimentController";

useContainer(Container);

const app = createExpressServer({
	controllers: [SentimentController],
});

const sentimentService = new SentimentService();

app.set("sentimentService", sentimentService);

app.listen(3003, () => {
	console.log("Sentiment Analysis Service is running on port 3003");
});
