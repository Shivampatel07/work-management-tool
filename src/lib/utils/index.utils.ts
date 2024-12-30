import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { ENVIRONMENT } from "./constant";
import bcrypt from "bcryptjs"

export const successResponse = (data: unknown, message: string) => {
	return NextResponse.json({
		success: 1,
		data,
		message
	})
}

export const errorResponse = (message: string, status_code: number) => {
	return NextResponse.json({
		success: 0,
		message,
		status: status_code
	},
	{status: status_code})
}

export const catchResponse = (error: unknown , message: string) => {
	if (ENVIRONMENT === "development") {
		console.error(error);
	}
	return NextResponse.json({
		success: 0,
		message,
		status: 500
	},
	{status: 500})
}

export const parseBody = async (req: Request) => {
	try {
		const contentType = req.headers.get("Content-Type") || "";

		if (contentType.includes("application/json")) {
			return await req.json(); // Parse JSON body
		} else if (contentType.includes("application/x-www-form-urlencoded")) {
			const formData = await req.text(); // Parse form data
			return Object.fromEntries(new URLSearchParams(formData)); // Convert to an object
		} else {
			throw new Error("Unsupported content type");
		}
	} catch (error) {
		return {};
	}
}

export const createJwtToken = (payload: Record<string, unknown>, secret: string, options: jwt.SignOptions = {}) => {
	return jwt.sign(payload, secret, options);
}

export const encryptPassword = (password: string) => {
	return bcrypt.hashSync(password, 14);
}

export const comparePassword = (password: string, hash: string) => {
	return bcrypt.compareSync(password, hash);
}