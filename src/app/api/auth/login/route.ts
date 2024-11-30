import { MongooseError } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from 'bcryptjs';
import { UserModel } from "@/model";
import { LoginRequestSchema } from "@/schemas";
import { responseMessage } from "@/utils";

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();
        LoginRequestSchema.parse(payload);

        const user = await UserModel.findOne({
            $or: [{ email: payload.email }, { username: payload.username }]
        });

        return NextResponse.json({
            success: true,
            message: responseMessage.insertSuccessful,
            data: user
        }, { status: 201 });
    } catch (error: any) {
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
            error: error.message,
            message: responseMessage.internalServerError,
        }, { status: 500 });
    }
}
