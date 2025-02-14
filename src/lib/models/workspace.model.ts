import mongoose from "mongoose";

export interface IWorkspace extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  owner: mongoose.Schema.Types.ObjectId;
  members: {
    role: string;
    user: mongoose.Schema.Types.ObjectId;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const WorkspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  members: [
    {
      role: {
        type: String,
        enum: ["member", "admin"],
        default: "member"
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
      }
    }
  ],
}, { timestamps: true });


export default mongoose.models.workspaces || mongoose.model<IWorkspace>("workspaces", WorkspaceSchema);