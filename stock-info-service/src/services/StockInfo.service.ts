import { Service } from "typedi";

import {
	getStockQuote,
	getMarketGainers,
	getStockHistoricalData,
} from "../../utils/requests";

@Service()
export class StockInfoService {
	// stock market gainers

	async getStockMarketGainers() {
		try {
			// fetch today's market gainers

			const marketGainers = await getMarketGainers();

			// return the aggregated data

			return marketGainers;
		} catch (error) {
			// handle and log errors

			console.error(
				"Error retrieving stock market gainers:",

				error
			);

			throw new Error(
				"Error retrieving stock market gainers"
			);
		}
	}

	// quote stock
	async getStockQuote(ticker: string) {
		try {
			// fetch stock quote
			const stockQuote = await getStockQuote(ticker);

			// return the stock quote
			return stockQuote;
		} catch (error) {
			// handle and log errors
			console.error("Error retrieving stock quote:", error);

			throw new Error("Error retrieving stock quote");
		}
	}

	// stock historical data
	async getStockHistoricalData(ticker: string) {
		try {
			// fetch stock historical data
			const stockHistoricalData =
				await getStockHistoricalData(ticker);

			// return the stock historical data
			return stockHistoricalData;
		} catch (error) {
			// handle and log errors
			console.error(
				"Error retrieving stock historical data:",

				error
			);

			throw new Error(
				"Error retrieving stock historical data"
			);
		}
	}
}
