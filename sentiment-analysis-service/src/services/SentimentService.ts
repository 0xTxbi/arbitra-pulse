import * as natural from "natural";

class SentimentService {
	private sentimentAnalyzer: any;

	constructor() {
		// initialise the sentiment analyzer
		this.sentimentAnalyzer = new natural.SentimentAnalyzer(
			"English",
			natural.PorterStemmer,
			"afinn"
		);
	}
}

export default SentimentService;
