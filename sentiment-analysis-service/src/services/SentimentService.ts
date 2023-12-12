import * as natural from "natural";
import axios from "axios";
import { Service } from "typedi";

@Service()
class SentimentService {
	private sentimentAnalyzer: any;
	// store fetched articles
	private cachedNewsArticles: any[] = [];

	constructor() {
		// initialize the sentiment analyzer
		this.sentimentAnalyzer = new natural.SentimentAnalyzer(
			"English",
			natural.PorterStemmer,
			"afinn"
		);
	}

	async analyzeSentiment(stockSymbol: string): Promise<any> {
		try {
			// fetch stock information from the Stock Info service
			const stockInfo = await this.fetchStockInfo(
				stockSymbol
			);

			// fetch news articles from the news service
			const newsArticles = await this.fetchNewsData(
				stockSymbol
			);

			// store fetched news articles for further analysis or use
			this.cachedNewsArticles = newsArticles;

			// perform sentiment analysis using fetched data
			const sentimentResult = this.performSentimentAnalysis(
				stockSymbol,
				newsArticles,
				stockInfo
			);
			console.log(this.cachedNewsArticles);
			return sentimentResult;
		} catch (error) {
			throw new Error(
				`Error analyzing sentiment: ${error.message}`
			);
		}
	}

	private async fetchStockInfo(stockSymbol: string): Promise<any> {
		try {
			const response = await axios.get(
				`http://localhost:3001/stock/${stockSymbol}`
			);

			return response.data;
		} catch (error) {
			throw new Error(
				`Error fetching stock information: ${error.message}`
			);
		}
	}

	private async fetchNewsData(stockSymbol: string): Promise<any[]> {
		try {
			const response = await axios.get(
				`http://localhost:3002/news/${stockSymbol}`
			);

			return response.data;
		} catch (error) {
			throw new Error(
				`Error fetching news data: ${error.message}`
			);
		}
	}

	private performSentimentAnalysis(
		stockSymbol: string,
		newsArticles: any[],
		stockInfo: any
	): any {
		const overallSentiment =
			this.analyzeHeadlines(newsArticles) +
			this.analyzeStockInfo(stockInfo);

		const sentimentResult = {
			stockSymbol: stockSymbol,
			sentiment:
				overallSentiment >= 0 ? "positive" : "negative",
			confidence:
				Math.abs(overallSentiment) /
				(newsArticles.length + 1),
			currentStockPrice: stockInfo.currentStockPrice,
		};

		return sentimentResult;
	}

	private analyzeHeadlines(newsArticles: any[]): number {
		// analyse sentiment based on the headlines of news articles
		return this.cachedNewsArticles.reduce(
			(totalSentiment, article) =>
				totalSentiment +
				this.sentimentAnalyzer.getSentiment(
					article.title
				).score,
			0
		);
	}

	private analyzeStockInfo(stockInfo: any): number {
		return 0;
	}
}

export default SentimentService;
