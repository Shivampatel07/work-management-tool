
import jwt from 'jsonwebtoken';
import { errorResponse } from '@/lib/utils/index.utils';
import { CustomRequestWithUser } from '../types';
import accessTokenModel from '../models/access.token.model';



// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const verifyJwtMiddleware = (handler: Function) => {
	return async (req: CustomRequestWithUser) => {
		try {
			const token = req.headers.get('Authorization')?.split(' ')[1]; // Extract token from "Authorization: Bearer <token>"

			if (!token) {
				return errorResponse('No token provided.', 401);
			}

			const secretKey = process.env.JWT_SECRET;
			if (!secretKey) {
				throw new Error('JWT secret not set in environment variables.');
			}

			const decoded = jwt.verify(token, secretKey);
			const isTokenExist = await accessTokenModel.exists({ token })
			if (!isTokenExist) {
				return errorResponse('Invalid token.', 401);
			}
			req.user = decoded;

			// Proceed to the next handler
			return handler(req);
		} catch {
			return errorResponse('Invalid token.', 401);
		}
	};
};

export default verifyJwtMiddleware;
