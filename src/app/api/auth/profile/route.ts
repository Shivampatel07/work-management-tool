import { apiHandler } from "@/lib/middleware/index.middleware";
import verifyJwtMiddleware from "@/lib/middleware/verify.jwt.middleware";
import userModel from "@/lib/models/user.model";
import { CustomRequestWithUser } from "@/lib/types";
import { catchResponse, successResponse } from "@/lib/utils/index.utils";

export const GET = apiHandler(verifyJwtMiddleware(async (req: CustomRequestWithUser) => {
	try {
		const userId = req.user.user_id;
		const users = await userModel.find({ _id: userId }, '-__v -password');
		return successResponse(users, "Users fetched successfully");
	}
	catch (error) {
		return catchResponse(error, "Error fetching users");
	}
}))