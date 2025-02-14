import { apiHandler } from "@/lib/middleware/index.middleware";
import verifyJwtMiddleware from "@/lib/middleware/verify.jwt.middleware";
import accessTokenModel from "@/lib/models/access.token.model";
import { CustomRequestWithUser } from "@/lib/types";
import { catchResponse, errorResponse, successResponse } from "@/lib/utils/index.utils";

export const POST = apiHandler(verifyJwtMiddleware(async (req: CustomRequestWithUser) => {
	try {
		const token = req.headers.get('Authorization')?.split(' ')[1];
        const sessionAvailable = await accessTokenModel.deleteOne({ token });
        if (sessionAvailable.deletedCount === 0) {
            return errorResponse('Invalid token.', 401);
        }
		return successResponse({}, "User logout successfully");
	}
	catch (error) {
		return catchResponse(error, "Error during logout");
	}
}))