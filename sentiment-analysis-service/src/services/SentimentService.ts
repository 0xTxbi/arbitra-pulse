import * as natural from "natural";
import axios from "axios";
import { Service } from "typedi";
import * as dotenv from "dotenv";

dotenv.config();

@Service()
class SentimentService {
	private sentimentAnalyzer: any;
	// store fetched articles

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

	// logic to perform sentiment analysis
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
		return newsArticles.reduce((totalSentiment, article) => {
			// extract the title from the current article
			const articleTitle = article.title;

			// get the sentiment analysis result for the title
			const sentimentAnalysisResult =
				this.sentimentAnalyzer.getSentiment(
					articleTitle
				);

			console.log(sentimentAnalysisResult);

			// extract the sentiment score from the analysis result
			const sentimentScore = sentimentAnalysisResult.score;

			// add the sentiment score to the totalSentiment
			const updatedTotalSentiment =
				totalSentiment + sentimentScore;

			return updatedTotalSentiment;
		}, 0);
	}

	private analyzeStockInfo(stockInfo: any): number {
		return 0;
	}
}

export default SentimentService;
