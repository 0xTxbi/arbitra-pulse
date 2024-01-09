import axios from "axios";

interface MarketGainers {
	date: string;
	company: string;
	ticker: string;
}

// retrieve market gainers
export async function getMarketGainers(): Promise<any> {
	try {
		const response = await axios.get(
			"https://quantscrape.fly.dev/market-gainers"
		);

		const marketGainers = response.data;

		return marketGainers;
	} catch (error) {
		console.error("Failed to fetch today's market gainers");

		// robust error handling
		if (error.response) {
			// triggers when the request was made and the server responded with a status code that falls out of the range of 2xx
			console.error(
				`Response data: ${JSON.stringify(
					error.response.data
				)}`
			);
			console.error(
				`Response status: ${error.response.status}`
			);
		} else if (error.request) {
			// triggers when the request was made but no response was received
			console.error(`Request: ${error.request}`);
		} else {
			// triggers when something happened in setting up the request that triggered an error
			console.error(`Error: ${error.message}`);
		}
		return null;
	}
}

// retrieve stock price and related stocks
export async function getBasicStockInfo(
	ticker: string,
	market: string
): Promise<any> {
	try {
		const response = await axios.get(
			`https://quantscrape.fly.dev/stock/${ticker}:${market}`
		);

		const basicStockInfo = response.data;

		return basicStockInfo;
	} catch (error) {
		console.error("Failed to fetch stock info");

		// robust error handling
		if (error.response) {
			// triggers when the request was made and the server responded with a status code that falls out of the range of 2xx
			console.error(
				`Response data: ${JSON.stringify(
					error.response.data
				)}`
			);
			console.error(
				`Response status: ${error.response.status}`
			);
		} else if (error.request) {
			// triggers when the request was made but no response was received
			console.error(`Request: ${error.request}`);
		} else {
			// triggers when something happened in setting up the request that triggered an error
			console.error(`Error: ${error.message}`);
		}
		return null;
	}
}
