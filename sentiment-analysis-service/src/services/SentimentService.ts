import * as natural from "natural";
import axios from "axios";
import { Service } from "typedi";
import * as dotenv from "dotenv";

dotenv.config();

@Service()
class SentimentService {
	constructor() {}

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

			// perform sentiment analysis using fetched data
			const sentimentResult = this.performSentimentAnalysis(
				stockSymbol,
				newsArticles,
				stockInfo
			);

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
				`${process.env.STOCK_INFO_SERVICE}/stock/${stockSymbol}`
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
				`${process.env.NEWS_SERVICE}/news/${stockSymbol}`
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
		// initialize the sentiment analyzer
		const sentimentAnalyzer = new natural.SentimentAnalyzer(
			"English",
			natural.PorterStemmer,
			"afinn"
		);

		// analyze sentiment based on the content of news articles
		const headlineSentiment = newsArticles.reduce(
			(totalSentiment, article) => {
				// ensure article.content is a string
				const content =
					typeof article.content === "string"
						? article.content
						: "";
				const sentimentAnalysisResult =
					sentimentAnalyzer.getSentiment(
						content.split(" ")
					);
				return totalSentiment + sentimentAnalysisResult;
			},
			0
		);

		// calculate the average sentiment score
		const averageSentimentScore =
			headlineSentiment / newsArticles.length;

		// calculate the sentiment score on a scale of 0 to 100
		const sentimentScore = Math.round(
			(averageSentimentScore + 1) * 50
		);

		// determine the sentiment based on the average sentiment score
		const sentiment =
			averageSentimentScore > 0 ? "positive" : "negative";

		// calculate the confidence level
		const confidenceLevel =
			(Math.abs(averageSentimentScore) /
				(newsArticles.length + 1)) *
			100;

		return {
			score: sentimentScore,
			confidenceLevel: confidenceLevel,
		};
	}
}

export default SentimentService;
