import { z } from "zod";
import { MongooseError } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { PostModel } from "@/model";
import { PostSchema } from "@/schemas";
import { responseMessage } from "@/utils";
import { AuthorizedRequest } from "@/types/token";


export async function GET(request: AuthorizedRequest) {
    try {
        console.log(request.user, 'user');
        const posts = await PostModel.find({});
        return NextResponse.json({
            message: responseMessage.fetchSuccessful,
            success: true,
            data: posts
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: responseMessage.fetchFailed }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();
        PostSchema.parse(payload);
        const post = await PostModel.create(payload);
        return NextResponse.json({
            success: true,
            message: responseMessage.insertSuccessful,
            data: post
        }, { status: 201 });
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
                message: responseMessage.dbRejection,
            }, { status: 500 });
        }

        return NextResponse.json({
            success: false,
            message: responseMessage.internalServerError,
        }, { status: 500 });
    }
}
