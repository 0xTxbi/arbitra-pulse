import {
	News,
	User,
	Watchlist,
	SentimentResult,
	StockInfo,
} from "arbitra-pulse-entities";
import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

// load environment variables from .env file
dotenv.config();

const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST || "",
	port: parseInt(process.env.DB_PORT || "", 10),
	username: process.env.DB_USERNAME || "",
	password: process.env.DB_PASSWORD || "",
	database: process.env.DB_DATABASE || "",
	synchronize: true,
	logging: true,
	entities: [User, Watchlist, News, SentimentResult, StockInfo],
	migrations: [],
	ssl: {
		rejectUnauthorized: false,
	},
});

// initialize the DataSource
AppDataSource.initialize()
	.then(() => {
		console.log("Data Source has been initialized!");
	})
	.catch((err) => {
		console.error("Error during Data Source initialization", err);
	});

// export the datasource for global usage
export default AppDataSource;
