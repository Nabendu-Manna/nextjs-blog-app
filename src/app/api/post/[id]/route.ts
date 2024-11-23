import { MongooseError } from "mongoose";
import { NextRequest } from "next/server";
import { PostModel } from "@/model";


export async function GET(
    request: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const posts = await PostModel.findById(params.id);
        return Response.json({
            message: "Boom! 🚀 Data fetched successfully! It's like magic, but better! 🪄✨",
            success: true,
            data: posts
        }, { status: 200 });
    } catch (error) {
        if (error instanceof MongooseError) {
            return Response.json({
                success: false,
                error: error.message,
                message: "Data Not Found! 🕵️‍♂️🔍 Looks like the data you’re looking for is playing hide and seek, and it’s winning. Let’s check the ID and try again—hopefully, it’ll come out of hiding! 🏃‍♂️🌳",
            }, { status: 404 });
        }
        return Response.json({ success: false, message: "Oops! 🤦‍♂️ The data didn't want to be fetched today. Maybe it's having a bad hair day. 🌧️🌪️" }, { status: 500 });
    }
}