import { User, Watchlist } from "arbitra-pulse-entities";

import { Service } from "typedi";
import { getBasicStockInfo, getMarketGainers } from "../../utils/requests";

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
	async getStockQuote(ticker: string, market: string) {
		try {
			// fetch stock quote
			const stockQuote = await getBasicStockInfo(
				ticker,
				market
			);

			// return the stock quote
			return stockQuote;
		} catch (error) {
			// handle and log errors
			console.error("Error retrieving stock quote:", error);
			throw new Error("Error retrieving stock quote");
		}
	}
}
