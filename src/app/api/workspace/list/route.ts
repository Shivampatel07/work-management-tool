import { apiHandler } from "@/lib/middleware/index.middleware";
import verifyJwtMiddleware from "@/lib/middleware/verify.jwt.middleware";
import workspaceModel from "@/lib/models/workspace.model";
import { CustomRequestWithUser } from "@/lib/types";
import { catchResponse, successResponse } from "@/lib/utils/index.utils";

export const GET = apiHandler(verifyJwtMiddleware(async (req: CustomRequestWithUser) => {
	try {
		const userId = req.user.user_id;
		const workSpaceList = await workspaceModel.find({ owner: userId }, '-__v -createdAt -updatedAt')

		return successResponse(workSpaceList, "Workspaces fetched successfully");
	}
	catch (error) {
		return catchResponse(error, "Error fetching users");
	}
}))