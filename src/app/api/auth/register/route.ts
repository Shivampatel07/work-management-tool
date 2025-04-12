import { apiHandler } from "@/lib/middleware/index.middleware";
import accessTokenModel from "@/lib/models/access.token.model";
import userModel from "@/lib/models/user.model";
import workspaceModel from "@/lib/models/workspace.model";
import { JWT_SECRET } from "@/lib/utils/constant";
import { catchResponse, createJwtToken, encryptPassword, errorResponse, parseBody, successResponse } from "@/lib/utils/index.utils";
import Joi from "joi";
import { v4 } from "uuid";

const registerSchema = Joi.object<{ email: string, password: string, name: string }>({
	email: Joi.string().trim().lowercase().email().required(),
	password: Joi.string().trim().required(),
	name: Joi.string().trim().required()
});

export const POST = apiHandler(async (req: Request) => {
	try {
		const body = await parseBody(req);
		const { error, value } = registerSchema.validate(body);
		if (error) {
			const errorMessage = error.details[0].message;
			return errorResponse(errorMessage, 400);
		}

		const { email, password, name } = value;
		// Save user to database
		const userExists = await userModel.findOne({ email });
		if (userExists) {
			return errorResponse("User already exists", 400);
		}

		const hashedPassword = encryptPassword(password)
		const userData = new userModel({
			email,
			password: hashedPassword,
			name,
		})
		const user = await userData.save()
		const token = createJwtToken({ user_id: user._id, uuid: v4() }, JWT_SECRET)

		// Save token to database
		const accessToken = new accessTokenModel({
			token,
			user_id: user._id,
			device_name: "Web"
		})
		await accessToken.save()

		// Create 1st workspace for user by default
		const workspace = new workspaceModel({
			name: `${user.name}'s Workspace`,
			owner: user._id,
			uuid: v4()
		})
		await workspace.save()

		const responseBody = {
			email: user.email,
			token
		}
		return successResponse(responseBody, "User registered successfully");
	} catch (error) {
		return catchResponse(error, "Error registering user");
	}
})