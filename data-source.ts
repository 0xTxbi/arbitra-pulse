import { DataSource } from "typeorm";

import { User } from "./authentication-service/entities/User";
import { NewsData } from "./news-data-service/entities/NewsData";
import { SentimentData } from "./sentiment-analysis-service/entities/SentimentData";
import { Stock } from "./shared/entities/Stock";
import { configDotenv } from "dotenv";
import { Watchlist } from "./authentication-service/entities/Watchlist";

// load environment variables from .env file
configDotenv();

const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST || "",
	port: parseInt(process.env.DB_PORT || "", 10),
	username: process.env.DB_USERNAME || "",
	password: process.env.DB_PASSWORD || "",
	database: process.env.DB_DATABASE || "",
	synchronize: true,
	logging: true,
	entities: [User, Watchlist, NewsData, SentimentData, Stock],
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
