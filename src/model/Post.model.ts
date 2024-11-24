import { blogConnection } from "@/lib/dbConnect";
import mongoose, { Schema, Document, now } from "mongoose";

export interface Post extends Document {
    title: string;
    subTitle: string;
    body: string;
    image: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
};

const PostSchema: Schema<Post> = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        unique: true,
        index: true,
        maxLength: [50, 'Title can not exceed 50 characters'],
    },
    subTitle: {
        type: String,
        required: [true, 'Subtitle is required'],
        maxLength: [200, 'Subtitle can not exceed 200 characters'],
    },
    body: {
        type: String,
    },
    image: {
        type: String,
    },
    author: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: now,
    },
    updatedAt: {
        type: Date,
    }
});

export const PostModel = blogConnection.models.Post || blogConnection.model('Post', PostSchema);
