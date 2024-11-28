import { MongooseError } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from 'bcryptjs';
import { UserModel } from "@/model";
import { UserSchema } from "@/schemas";
import { responseMessage } from "@/utils";

export async function POST(request: NextRequest) {
    try {
        let { password, ...payload } = await request.json();
        UserSchema.parse({ ...payload, password });

        const [userByEmail, userByUserName] = await Promise.all([
            UserModel.findOne({
                email: payload.email
            }), UserModel.findOne({
                username: payload.username
            })
        ])

        const errors = [];
        if (userByEmail)
            errors.push('User found with this email');
        if (userByUserName)
            errors.push('User found with this username');
        if(errors.length > 0)
            throw new Error(errors.toString());

        const now = new Date();
        const fiveMinutesLater = new Date(now.getTime() + 5 * 60 * 1000);
        password = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            ...payload,
            password: password,
            verifyCode: "123456",
            verifyCodeExpiry: fiveMinutesLater
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
