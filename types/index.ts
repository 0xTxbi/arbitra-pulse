import { User } from "../authentication-service/entities/User";

export type AuthUserDetails = {
	id: number;
	username: string;
	email: string;
};

export type AuthResponse =
	| { message: string; successCode: number; userDetails: AuthUserDetails }
	| { message: string; successCode: number };
