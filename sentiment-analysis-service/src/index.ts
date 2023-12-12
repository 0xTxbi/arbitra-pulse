import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import SentimentService from "./services/SentimentService";

useContainer(Container);

const app = createExpressServer({
	controllers: [],
});

const sentimentService = new SentimentService();

app.set("sentimentService", sentimentService);

app.listen(3003, () => {
	console.log("Sentiment Analysis Service is running on port 3003");
});
