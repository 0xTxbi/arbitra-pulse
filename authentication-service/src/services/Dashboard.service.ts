import { User, Watchlist } from "arbitra-pulse-entities";
import { getUpcomingEarnings, getWatchlistNews } from "../../utils/requests";
import { Service } from "typedi";

@Service()
export class DashboardService {
	async getDashboardData(currentUser: User) {
		try {
			// log user
			console.log(currentUser);
			// fetch dashboard components data

			// retrieve upcoming earnings
			const upcomingEarnings = await getUpcomingEarnings();

			// extract tickers from current user's watchlist
			const userTickers = (currentUser.watchlist || []).map(
				(item: Watchlist) => item.symbol
			);

			// retrieve watchlist news
			const watchlistNews = await getWatchlistNews(
				userTickers
			);

			// Return the aggregated data
			return {
				welcomeMessage: "Welcome to Your Dashboard!",
				upcomingEarnings,
				watchlistNews,
			};
		} catch (error) {
			// handle and log errors
			console.error(
				"Error retrieving your dashboard data:",
				error
			);
			throw new Error("Error retrieving your dashboard data");
		}
	}
}
