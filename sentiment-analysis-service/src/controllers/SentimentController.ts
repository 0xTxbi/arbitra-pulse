import { JsonController, Get, Param } from "routing-controllers";
import { Service } from "typedi";
import SentimentService from "../services/SentimentService";

@JsonController()
@Service()
export class SentimentController {
	constructor(private sentimentService: SentimentService) {}

	@Get("/sentiment/:stockSymbol")
	async getSentimentAnalysis(
		@Param("stockSymbol") stockSymbol: string
	): Promise<any> {
		console.log("hey");
		try {
			const result =
				await this.sentimentService.analyzeSentiment(
					stockSymbol
				);
			return { success: true, data: result };
		} catch (error) {
			return { success: false, error: error.message };
		}
	}
}
