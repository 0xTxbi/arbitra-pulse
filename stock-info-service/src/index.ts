import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import { StockInfoController } from "./controllers/StockInfoController";
import Container from "typedi";
import { StockInfoService } from "./services/StockInfo.service";

useContainer(Container);

const app = createExpressServer({
	controllers: [StockInfoController],
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

// stock info service
const stockInfoService = new StockInfoService();

app.set("stockInfoService", stockInfoService);

app.listen(3001, () => {
	console.log("the Stock Info Service is running on port 3001");
});
