import axios from "axios";

interface UpcomingEarnings {
	date: string;
	company: string;
	ticker: string;
}

// retrieve upcoming earnings
export async function getUpcomingEarnings(): Promise<UpcomingEarnings[]> {
	try {
		const response = await axios.get(
			"https://quantscrape.fly.dev/upcoming-earnings"
		);

		// assert type
		const upcomingEarnings = response.data as UpcomingEarnings[];

		return upcomingEarnings;
	} catch (error) {
		console.error("Failed to fetch upcoming earnings");

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

// retrieve watchlist news
export async function getWatchlistNews(tickers: string[]): Promise<any> {
	try {
		// initialise array to hold news
		let watchlistNews = [];

		for (const ticker of tickers) {
			const newsForTicker = await getTickerNews(ticker);

			// as the result is an array, push into the watchlistNews array
			watchlistNews.push(newsForTicker[0]);
		}

		return watchlistNews;
	} catch (error) {
		console.error("Failed to fetch news from your watchlist");

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

// retrieve news about a ticker
export async function getTickerNews(ticker: string): Promise<any[]> {
	try {
		const response = await axios.get(
			`https://arbitra-pulse-news.fly.dev/news/${ticker}`
		);
		const tickerNews = response.data;

		return tickerNews;
	} catch (error) {
		console.error("Failed to fetch ticker news");

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
