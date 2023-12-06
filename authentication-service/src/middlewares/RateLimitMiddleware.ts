import rateLimit from "express-rate-limit";

export const authRateLimit = rateLimit({
	windowMs: 60 * 1000,
	max: 5,
	message: "Too many authentication attempts. Please try again later.",
});

export const profileUpdateRateLimit = rateLimit({
	windowMs: 60 * 1000,
	max: 10,
	message: "Too many profile update requests. Please try again later.",
});
