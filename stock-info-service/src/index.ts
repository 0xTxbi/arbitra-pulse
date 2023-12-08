import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { StockInfoController } from "./controllers/StockInfoController";

const app = createExpressServer({
	controllers: [StockInfoController],
});

app.listen(3001, () => {
	console.log("the Stock Info Service is running on port 3001");
});
