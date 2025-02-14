import mongoose from "mongoose";

export interface IMessage extends mongoose.Document {
    _id: mongoose.Schema.Types.ObjectId;
    sender: mongoose.Schema.Types.ObjectId;
    channel: mongoose.Schema.Types.ObjectId;
    content?: string;
    file_url?: string;
    createdAt: Date;
    updatedAt: Date;
}

const MessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "channels",
        required: true
    },
    content: String,
    file_url: String
}, { timestamps: true });


export default mongoose.models.messages || mongoose.model<IMessage>("messages", MessageSchema);