import { MongooseError } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
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

        if (!post) {
            throw new MongooseError("Record not found")
        }

        return NextResponse.json({
            message: responseMessage.dataFound,
            success: true,
            data: post
        }, { status: 200 });
    } catch (error) {
        if (error instanceof MongooseError) {
            return NextResponse.json({
                success: false,
                error: error.message,
                message: responseMessage.dataNotFound,
            }, { status: 404 });
        }
        return NextResponse.json({ success: false, message: responseMessage.internalServerError }, { status: 500 });
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

        if (!post) {
            throw new MongooseError("Record not found")
        }

        return NextResponse.json({
            message: responseMessage.updateSuccessful,
            success: true,
            data: post
        }, { status: 200 });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({
                success: false,
                message: responseMessage.invalidPayload,
                errors: error.issues,
            }, { status: 400 });
        } else if (error instanceof MongooseError) {
            return NextResponse.json({
                success: false,
                error: error.message,
                message: responseMessage.dataNotFound,
            }, { status: 404 });
        }

        return NextResponse.json({
            success: false,
            message: responseMessage.internalServerError,
        }, { status: 500 });
    }
}


export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const post = await PostModel.findByIdAndDelete(params.id);

        if (!post) {
            throw new MongooseError("Record not found")
        }

        return NextResponse.json({
            message: responseMessage.deleteSuccessful,
            success: true,
        }, { status: 200 });

    } catch (error) {
        if (error instanceof MongooseError) {
            return NextResponse.json({
                success: false,
                error: error.message,
                message: responseMessage.dataNotFound,
            }, { status: 404 });
        }

        return NextResponse.json({
            success: false,
            message: responseMessage.internalServerError,
        }, { status: 500 });
    }
}
