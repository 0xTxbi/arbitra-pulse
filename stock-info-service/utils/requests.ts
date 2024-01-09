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

// retrieve stock quote
export async function getStockQuote(ticker: string): Promise<any> {
	try {
		const response = await axios.get(
			`https://quantscrape.fly.dev/quote/${ticker}`
		);

		const stockQuote = response.data;

		return stockQuote;
	} catch (error) {
		console.error("Failed to fetch stock quote");

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

// retrieve stock historical data

export async function getStockHistoricalData(ticker: string): Promise<any> {
	try {
		const response = await axios.get(
			`https://quantscrape.fly.dev/historical-data/${ticker}`
		);

		const stockHistoricalData =
			response.data.stock_historical_data.data;

		return stockHistoricalData;
	} catch (error) {
		console.error("Failed to fetch stock historical data");

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
