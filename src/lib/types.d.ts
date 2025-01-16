export interface CustomRequestWithUser extends Request {
	user?: JwtPayload | string;
}