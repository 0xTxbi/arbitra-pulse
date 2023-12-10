import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { NewsController } from "./controllers/NewsController";

const app = createExpressServer({
	controllers: [NewsController],
});

app.listen(3002, () => {
	console.log("the News Service is running on port 3002");
});
