import mongoose from "mongoose";

export interface IChannel extends mongoose.Document {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    workspace_id: mongoose.Schema.Types.ObjectId;
    visibility: string;
    type: string;
    members: {
        role: string;
        user: mongoose.Schema.Types.ObjectId;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

const ChannelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    workspace_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "workspaces",
        required: true
    },
    visibility: {
        type: String,
        required: true,
        enum: ["public", "private"],
        default: "public"
    },
    type: {
        type: String,
        required: true,
        enum: ["text", "voice"],
        default: "text"
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


export default mongoose.models.channels || mongoose.model<IChannel>("channels", ChannelSchema);