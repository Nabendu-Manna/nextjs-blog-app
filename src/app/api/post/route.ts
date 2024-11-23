import { z } from "zod";
import { MongooseError } from "mongoose";
import { NextRequest } from "next/server";
import { PostModel } from "@/model";
import { PostSchema } from "@/schemas/post";
import { responseMessage } from "@/utils";


export async function GET(request: NextRequest) {
    try {
        const posts = await PostModel.find({});
        return Response.json({
            message: responseMessage.fetchSuccessful,
            success: true,
            data: posts
        }, { status: 200 });
    } catch (error) {
        return Response.json({ success: false, message: responseMessage.fetchFailed }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();
        PostSchema.parse(payload);
        const post = await PostModel.create(payload);
        return Response.json({
            success: true,
            message: responseMessage.insertSuccessful,
            data: post
        }, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return Response.json({
                success: false,
                message: responseMessage.invalidPayload,
                errors: error.issues,
            }, { status: 400 });
        } else if (error instanceof MongooseError) {
            return Response.json({
                success: false,
                error: error.message,
                message: responseMessage.dbRejection,
            }, { status: 500 });
        }

        return Response.json({
            success: false,
            message: responseMessage.internalServerError,
        }, { status: 500 });
    }
}
