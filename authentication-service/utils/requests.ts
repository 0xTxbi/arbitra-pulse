import axios from "axios";

interface UpcomingEarnings {
	date: string;
	company: string;
	ticker: string;
}

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
