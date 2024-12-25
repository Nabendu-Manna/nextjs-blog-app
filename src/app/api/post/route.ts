import { z } from "zod";
import { MongooseError } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { PostModel } from "@/model";
import { PostSchema } from "@/schemas";
import { responseMessage } from "@/utils";
import { getAuthorizeUser } from "@/utils/tokenUtils";
import { writeFile } from "fs/promises";
import path from "path";


export async function GET(req: NextRequest) {
    try {
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

export async function POST(req: NextRequest) {
    try {
        const authUser = await getAuthorizeUser(req);
        if (!authUser) {
            throw new Error();
        }
        // const payload = await req.json();
        const formData = await req.formData();

        const { image, ...data } = PostSchema.parse(Object.fromEntries(formData));

        const file = formData.get("image");
        let filename: string | null = null;
        if (file && file instanceof File) {
            const buffer = Buffer.from(await file.arrayBuffer());
            filename = `[${Date.now()}]${file.name.replaceAll(" ", "_")}`;
            await writeFile(
                path.join(process.cwd(), "public/storage/" + filename),
                buffer as NodeJS.ArrayBufferView
            );
        }

        console.log(filename);
        
        const post = await PostModel.create({ ...data, userId: authUser.user_id, image: filename });
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
