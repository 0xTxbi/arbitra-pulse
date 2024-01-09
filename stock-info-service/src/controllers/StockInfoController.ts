import {
	JsonController,
	Get,
	Param,
	Post,
	OnUndefined,
	HeaderParams,
	Delete,
	Params,
} from "routing-controllers";
import { StockInfo, Watchlist } from "arbitra-pulse-entities";
import axios from "axios";
import * as dotenv from "dotenv";
import { FilteredStock } from "../types";
import { StockInfoService } from "../services/StockInfo.service";
import { Service } from "typedi";

dotenv.config();

class ApiError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ApiError";
	}
}

@JsonController()
@Service()
export class StockInfoController {
	private readonly stockInfoService: StockInfoService;

	constructor(stockInfoService: StockInfoService) {
		this.stockInfoService = stockInfoService;
	}

	// retrieve stock market's top gainers
	@Get("/market-gainers")
	async getStockMarketGainers() {
		const marketGainers =
			await this.stockInfoService.getStockMarketGainers();

		return marketGainers;
	}

	// retrieve stock price
	@Get("/quote/:ticker/:market")
	async quoteStock(
		@Param("ticker") ticker: string,
		@Param("market") market: string
	) {
		if (!ticker || !market) {
			throw new Error(
				"Please provide both ticker and market"
			);
		}
		const stockQuote = await this.stockInfoService.getStockQuote(
			ticker,
			market
		);

		return stockQuote;
	}

	// retrieve stock info
	@Get("/stock/:stockSymbol")
	async getStockInfo(
		@Param("stockSymbol") stockSymbol: string
	): Promise<StockInfo> {
		try {
			// retrieve stock information from the financial API
			const apiUrl = `${
				process.env.POL_FIN_API_URL
			}/tickers/${stockSymbol.toUpperCase()}?apiKey=${
				process.env.POL_FIN_API_KEY
			}`;
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

	// search for stock
	@Get("/search/:query")
	async searchStocks(
		@Param("query") query: string
	): Promise<{ stocks: FilteredStock[] }> {
		try {
			// retrieve stock symbols by keyword
			const searchApiUrl = `${process.env.TD_FIN_API_URL}/symbol_search?symbol=${query}&outputsize=5&apikey=${process.env.TD_FIN_API_KEY}`;
			const response = await axios.get(searchApiUrl);

			// filter out stocks whose exchange country isn't the United States
			const filteredStocks = response.data.data.filter(
				(stock: any) =>
					stock.country === "United States"
			);

			// map the filtered stocks to an array of simplified stock objects
			const stocks: FilteredStock[] = filteredStocks.map(
				(stock: any) => ({
					symbol: stock.symbol,
					exchange: stock.exchange,
					instrumentName: stock.instrument_name,
				})
			);

			return { stocks };
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw new ApiError(
					`Failed to perform stock search: ${error.message}`
				);
			}
			throw error;
		}
	}

	// retrieve stocklist items
	@Get("/watchlist")
	// handle cases when the watchlist is empty
	@OnUndefined(200)
	async getWatchlist(@HeaderParams() headers: any): Promise<Watchlist[]> {
		try {
			const authServiceUrl = `${process.env.AUTH_SERVICE}/watchlist`;

			const response = await axios.get(authServiceUrl, {
				headers: {
					// inject the bearer token included in the Authorization header
					Authorization: headers.authorization,
				},
			});

			const watchlist: Watchlist[] = response.data;

			return watchlist;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					// log all possible errors
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log("Error", error.message);
				}
			}
		}
	}

	// add stock to watchlist
	@Post("/watchlist/add/:symbol")
	async addToWatchlist(
		@HeaderParams() headers: any,
		@Param("symbol") symbol: string
	): Promise<any> {
		try {
			const authServiceReqUrl = `${process.env.AUTH_SERVICE}/watchlist/add/${symbol}`;

			const response = await axios.post(
				authServiceReqUrl,
				null,
				{
					headers: {
						// inject the bearer token included in the Authorization header
						Authorization:
							headers.authorization,
					},
				}
			);

			return response.data;
		} catch (error) {
			console.error(
				"Failed to add to watchlist:",
				error.message
			);
			return { error: "Failed to add to watchlist" };
		}
	}

	// delete stock from watchlist
	@Delete("/watchlist/remove/:symbol")
	async removeFromWatchlist(
		@HeaderParams() headers: any,
		@Param("symbol") symbol: string
	): Promise<{ message: string } | { error: string }> {
		try {
			const authServiceReqUrl = `${process.env.AUTH_SERVICE}/watchlist/remove/${symbol}`;
			console.log(authServiceReqUrl);

			const response = await axios.delete(authServiceReqUrl, {
				headers: {
					// inject the bearer token included in the Authorization header
					Authorization: headers.authorization,
				},
			});

			return response.data;
		} catch (error) {
			console.error(
				"Failed to remove from watchlist:",
				error.message
			);
			return { error: "Failed to remove from watchlist" };
		}
	}

	// clear stocks from watchlist
	@Delete("/watchlist/clear")
	async clearWatchlist(
		@HeaderParams() headers: any
	): Promise<{ message: string } | { error: string }> {
		try {
			const authServiceReqUrl = `${process.env.AUTH_SERVICE}/watchlist/clear`;

			const response = await axios.delete(authServiceReqUrl, {
				headers: {
					// inject the bearer token included in the Authorization header
					Authorization: headers.authorization,
				},
			});
			console.log(response.data);
			return response.data;
		} catch (error) {
			console.error(
				"Failed to clear watchlist:",
				error.message
			);
			return { error: "Failed to clear watchlist" };
		}
	}
}
