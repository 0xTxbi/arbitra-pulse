import { User, Watchlist } from "arbitra-pulse-entities";

import { Service } from "typedi";
import { getMarketGainers } from "../../utils/requests";

@Service()
export class StockInfoService {
	async getStockMarketGainers() {
		try {
			// fetch today's market gainers

			const marketGainers = await getMarketGainers();

			// Return the aggregated data
			return marketGainers;
		} catch (error) {
			// handle and log errors
			console.error(
				"Error retrieving your dashboard data:",
				error
			);
			throw new Error("Error retrieving your dashboard data");
		}
	}
}
