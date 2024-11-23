import { MongooseError } from "mongoose";
import { NextRequest } from "next/server";
import { z } from "zod";
import { PostModel } from "@/model";
import { PostSchema } from "@/schemas/post";
import { responseMessage } from "@/utils";


export async function GET(
    request: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const post = await PostModel.findById(params.id);
        return Response.json({
            message: responseMessage.dataFound,
            success: true,
            data: post
        }, { status: 200 });
    } catch (error) {
        if (error instanceof MongooseError) {
            return Response.json({
                success: false,
                error: error.message,
                message: responseMessage.dataNotFound,
            }, { status: 404 });
        }
        return Response.json({ success: false, message: responseMessage.internalServerError }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const payload = await request.json();
        PostSchema.parse(payload);

        const post = await PostModel.findByIdAndUpdate(params.id, payload);

        return Response.json({
            message: responseMessage.updateSuccessful,
            success: true,
            data: post
        }, { status: 200 });

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
