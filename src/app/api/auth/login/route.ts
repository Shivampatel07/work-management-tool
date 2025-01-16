import { apiHandler } from "@/lib/middleware/index.middleware";
import accessTokenModel from "@/lib/models/access.token.model";
import userModel from "@/lib/models/user.model";
import { JWT_SECRET } from "@/lib/utils/constant";
import { catchResponse, comparePassword, createJwtToken, errorResponse, parseBody, successResponse } from "@/lib/utils/index.utils";
import Joi from "joi";
import { v4 } from "uuid";

const loginSchema = Joi.object<{ email: string, password: string }>({
	email: Joi.string().trim().lowercase().email().required(),
	password: Joi.string().trim().required(),
});

export const POST = apiHandler(async (req: Request) => {
	try {
		const body = await parseBody(req);
		const { error, value } = loginSchema.validate(body);
		if (error) {
			const errorMessage = error.details[0].message;
			return errorResponse(errorMessage, 400);
		}

		const { email, password } = value;
		// Save user to database
		const user = await userModel.findOne({ email });
		if (!user) {
			return errorResponse("User not exists", 400);
		}

		const passwordMatch = comparePassword(password, user.password);
		if (!passwordMatch) {
			return errorResponse("Invalid password", 400);
		}

		const token = createJwtToken({ user_id: user._id, uuid: v4() }, JWT_SECRET)

		// Save token to database
		const accessToken = new accessTokenModel({
			token,
			user_id: user._id,
			device_name: "Web"
		})
		await accessToken.save()

		const responseBody = {
			email: user.email,
			token
		}
		return successResponse(responseBody, "User registered successfully");
	} catch (error) {
		return catchResponse(error, "Error registering user");
	}
})