import { User } from "arbitra-pulse-entities";
import { getUpcomingEarnings } from "../../utils/requests";
import { Service } from "typedi";

@Service()
export class DashboardService {
	async getDashboardData(currentUser: User) {
		try {
			// log user
			console.log(currentUser);
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
