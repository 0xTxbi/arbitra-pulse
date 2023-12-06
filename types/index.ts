export type AuthUserDetails = {
	id?: number;
	username: string;
	email: string;
};

export type AuthResponse =
	| {
			message: string;
			successCode: number;
			userDetails: AuthUserDetails;
			token: string;
	  }
	| { message: string; successCode: number };
