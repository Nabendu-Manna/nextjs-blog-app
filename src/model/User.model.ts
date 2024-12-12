import mongoose, { Schema, Document, now } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { accountsConnection } from "@/lib/dbConnect";

export interface User extends Document {
    userKey: string;
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<User> = new mongoose.Schema({
    userKey: {
        type: String,
        default: uuidv4,
        unique: true
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        index: true,
        match: [/.+\@.+\..+/, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verifyCode: {
        type: String,
        required: [true, 'Verify Code is required'],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, 'Verify Code Expiry is required'],
    },
    createdAt: {
        type: Date,
        required: [true, 'Verify Code Expiry is required'],
        default: now,
    },
    updatedAt: {
        type: Date,
    },
});

export const UserModel = accountsConnection.models.User || accountsConnection.model('User', UserSchema);