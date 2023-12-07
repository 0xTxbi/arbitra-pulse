import { JsonController, Get, Param } from "routing-controllers";
import { StockInfo } from "../../entities/StockInfo";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

class ApiError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ApiError";
	}
}

@JsonController("/stock")
export class StockInfoController {
	@Get("/:stockSymbol")
	async getStockInfo(
		@Param("stockSymbol") stockSymbol: string
	): Promise<StockInfo> {
		try {
			// retrieve stock information from the financial API
			const apiUrl = `${process.env.EXT_FIN_API_URL}/tickers/${stockSymbol}?apiKey=${process.env.EXT_FIN_API_KEY}`;

			const response = await axios.get(apiUrl);

			// map the response data to the StockInfo object
			const stockInfo: StockInfo = {
				symbol: response.data.results.ticker,
				companyName: response.data.results.name,
				currentPrice: response.data.results.market_cap,
				industry: response.data.results.sic_description,
				marketCap: response.data.results.market_cap,
				market: response.data.results.market,
				locale: response.data.results.locale,
				primaryExchange:
					response.data.results.primary_exchange,
				type: response.data.results.type,
				active: response.data.results.active,
				currencyName:
					response.data.results.currency_name,
				cik: response.data.results.cik,
				compositeFigi:
					response.data.results.composite_figi,
				shareClassFigi:
					response.data.results.share_class_figi,
				phoneNumber: response.data.results.phone_number,
				address: response.data.results.address.address1,
				description: response.data.results.description,
				sicCode: response.data.results.sic_code,
				sicDescription:
					response.data.results.sic_description,
				tickerRoot: response.data.results.ticker_root,
				homepageUrl: response.data.results.homepage_url,
				totalEmployees:
					response.data.results.total_employees,
				listDate: response.data.results.list_date,
				logoUrl: response.data.results.branding
					.logo_url,
				iconUrl: response.data.results.branding
					.icon_url,
				shareClassSharesOutstanding:
					response.data.results
						.share_class_shares_outstanding,
				weightedSharesOutstanding:
					response.data.results
						.weighted_shares_outstanding,
				roundLot: response.data.results.round_lot,
			};

			return stockInfo;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw new ApiError(
					`Failed to retrieve stock information: ${error.message}`
				);
			}
			throw error;
		}
	}
}
