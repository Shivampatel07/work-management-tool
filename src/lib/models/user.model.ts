import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  role: string;
  profile_picture?: string;
  status: string;
  is_online: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: ""
  },
  role: {
    type: String,
    default: "user"
  },
  profile_picture: String,
  status: {
    type: String,
    enum:  ["online", "offline", "busy", "away"],
    default: "offline"
  },
  is_online: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });


export default mongoose.models.user || mongoose.model<IUser>("user", UserSchema);