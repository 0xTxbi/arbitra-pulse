import { JsonController, Get, Param } from "routing-controllers";
import { StockInfo } from "../../entities/StockInfo";

@JsonController("/stock")
export class StockInfoController {
	@Get("/:stockSymbol")
	async getStockInfo(
		@Param("stockSymbol") stockSymbol: string
	): Promise<StockInfo> {
		try {
			// retrieve stock information from the financial API

			// mock stock data
			const mockStockInfo: StockInfo = {
				symbol: stockSymbol,
				companyName: "Mock Company",
				currentPrice: 100.0,
				industry: "Technology",
				marketCap: "1T",
				changePercent: 1.5,
				volume: 1000000,
				peRatio: 20.0,
			};

			return mockStockInfo;
		} catch (error) {
			throw new Error("Failed to retrieve stock information");
		}
	}
}
