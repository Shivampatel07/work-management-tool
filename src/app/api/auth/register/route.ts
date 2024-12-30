import { apiHandler } from "@/lib/middleware/index.middleware";
import accessTokenModel from "@/lib/models/access.token.model";
import userModel from "@/lib/models/user.model";
import { JWT_SECRET } from "@/lib/utils/constant";
import { catchResponse, createJwtToken, encryptPassword, errorResponse, parseBody, successResponse } from "@/lib/utils/index.utils";
import Joi from "joi";

const registerSchema = Joi.object<{ email: string, password: string }>({
	email: Joi.string().trim().lowercase().email().required(),
	password: Joi.string().trim().required(),
});

export const POST = apiHandler(async (req: Request) => {
	try {
		const body = await parseBody(req);
		const { error, value } = registerSchema.validate(body);
		if (error) {
			const errorMessage = error.details[0].message;
			return errorResponse(errorMessage, 400);
		}

		const { email, password } = value;
		// Save user to database
		const userExists = await userModel.findOne({ email });
		if (userExists) {
			return errorResponse("User already exists", 400);
		}

		const hashedPassword = encryptPassword(password)
		const userData = new userModel({
			email,
			password: hashedPassword
		})
		const user = await userData.save()
		const token = createJwtToken({ user_id: user._id }, JWT_SECRET)

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