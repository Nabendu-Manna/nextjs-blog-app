import { accountsConnection } from "@/lib/dbConnect";
import mongoose, { Schema, Document } from "mongoose";

export interface Blog extends Document {
    title: string;
    subTitle: string;
    body: string;
    image: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
};

const BlogSchema: Schema<Blog> = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please use a valid email address'],
    },
});
