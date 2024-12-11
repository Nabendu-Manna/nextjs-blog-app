import { UserModel } from "@/model";
import { RefreshTokenSchema } from "@/schemas";
import { generateAccessTokens, verifyRefreshToken } from "@/utils";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();
        RefreshTokenSchema.parse(payload);
        const tokenPayload = await verifyRefreshToken(payload.refreshToken);
        if (tokenPayload === null || typeof tokenPayload === 'string') {
            throw new Error();
        }

        const user = await UserModel.findById(tokenPayload.user_secrete);
        if (!user) {
            throw new Error();
        }

        const { username, email, _id } = user;
        const { accessToken } = await generateAccessTokens({ username, email, user_id: _id });
        return NextResponse.json({
            success: true,
            data: { accessToken, username, email, _id },
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: 'invalid invalid token payload'
        }, { status: 404 });
    }

}
