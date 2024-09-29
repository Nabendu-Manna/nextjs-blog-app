import { accountsConnection } from "@/lib/dbConnect";
import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    title: string;
    subTitle: string;
    body: string;
    image: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
};

