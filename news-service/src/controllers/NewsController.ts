import { JsonController, Param, Get } from "routing-controllers";
import axios from "axios";
import * as dotenv from "dotenv";
import { News } from "arbitra-pulse-entities";

dotenv.config();

@JsonController("/news")
export class NewsController {
	@Get("/:stockSymbol")
	async getNewsByStockSymbol(
		@Param("stockSymbol") stockSymbol: string
	): Promise<News> {
		try {
			const newsApiUrl = `${process.env.ND_NEWS_API_URL}/news?apikey=${process.env.ND_NEWS_API_KEY}&q=${stockSymbol}&language=en&category=business`;
			const response = await axios.get(newsApiUrl);

			const extractedNewsProps = response.data.results.map(
				(article: any) => ({
					article_id: article.article_id,
					title: article.title,
					link: article.link,
					creator: article.creator
						? article.creator.join(", ")
						: "",
					description: article.description,
					content: article.content,
					pubDate: article.pubDate,
				})
			);

			return extractedNewsProps;
		} catch (error) {
			console.error(
				"Error fetching news articles:",
				error.message
			);
			throw new Error("Failed to fetch news articles.");
		}
	}
}
