import { MongooseError } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from 'bcryptjs';
import { UserModel } from "@/model";
import { LoginRequestSchema } from "@/schemas";
import { generateTokens, responseMessage } from "@/utils";

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();

        LoginRequestSchema.parse(payload);

        const user = await UserModel.findOne({
            $or: [{ email: payload.username }, { username: payload.username }]
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: 'invalid username' // @Nabendu-Manna @todo change the error message
            }, { status: 404 });
        }
        const { password, username, email, _id } = user;
        const isPasswordCorrect = await bcrypt.compare(payload.password, password);
        if (!isPasswordCorrect) {
            return NextResponse.json({
                success: false,
                message: 'invalid password' // @Nabendu-Manna @todo change the error message
            }, { status: 404 });
        }

        const { accessToken, refreshToken } = generateTokens({
            accessTokenPayload: {
                user_id: _id,
                username: username,
                email: email,
            }, refreshTokenPayload: {
                user_secrete: _id,
            }
        })

        return NextResponse.json({
            success: true,
            data: {
                accessToken,
                refreshToken,
                username,
                email,
            }
        }, { status: 200 });
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
