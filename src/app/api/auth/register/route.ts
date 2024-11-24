import { MongooseError } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { UserModel } from "@/model";
import { UserSchema } from "@/schemas";
import { responseMessage } from "@/utils";

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();
        UserSchema.parse(payload);

        // const userBy = await UserModel.findOne({
        //     $or: [
        //         { email: payload.email },
        //         { username: payload.username }
        //     ]
        // })

        // const user = await UserModel.findOne({
        //     $or: [
        //         { email: payload.email },
        //         { username: payload.username }
        //     ]
        // })
        

        // if (user)
        //     throw new Error('User found with this email');

        const now = new Date();
        const fiveMinutesLater = new Date(now.getTime() + 5 * 60 * 1000);

        const user = await UserModel.create({
            ...payload,
            verifyCode: "123456",
            verifyCodeExpiry: fiveMinutesLater
        });

        return NextResponse.json({
            success: true,
            message: responseMessage.insertSuccessful,
            data: user
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
