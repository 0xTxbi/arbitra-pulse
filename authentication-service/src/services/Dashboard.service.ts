import { User } from "arbitra-pulse-entities";
import { getUpcomingEarnings } from "../../utils/requests";

export class DashboardService {
	async getDashboardData(currentUser: User) {
		try {
			// fetch dashboard components data
			const upcomingEarnings = await getUpcomingEarnings();

			// Return the aggregated data
			return {
				upcomingEarnings,
				welcomeMessage: "Welcome to Your Dashboard!",
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
