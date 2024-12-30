import mongoose from "mongoose";

export interface IAccessToken extends mongoose.Document {
	token: string;
	user_id: mongoose.Schema.Types.ObjectId;
	device_name: string;
}

const AccessTokenSchema = new mongoose.Schema({
	token: {
		type: String,
		required: true,
	},
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
	device_name: {
		type: String,
		default: "",
	},
});

export default mongoose.models.access_token || mongoose.model<IAccessToken>("access_token", AccessTokenSchema);