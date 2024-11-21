import { z } from "zod";
import { MongooseError } from "mongoose";
import { PostModel } from "@/model";
import { PostSchema } from "@/schemas/post";


export async function GET(request: Request) {
    try {
        const posts = await PostModel.find({});
        return Response.json({
            message: "Boom! 🚀 Data fetched successfully! It's like magic, but better! 🪄✨",
            success: true,
            data: posts
        }, { status: 200 });
    } catch (error) {
        return Response.json({ success: false, message: "Oops! 🤦‍♂️ The data didn't want to be fetched today. Maybe it's having a bad hair day. 🌧️🌪️" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const payload = await request.json();
        PostSchema.parse(payload);
        const post = await PostModel.create({
            title: payload.title,
            subTitle: payload.sub_title,
            body: payload.body,
            image: payload.image,
            author: payload.author,
        });
        return Response.json({
            success: true,
            message: "Success! 🎉 Your POST request just gave birth to a brand new data entry! The API stork has delivered your payload safely, and it’s now part of our happy little database family. 🍼📦",
            data: post
        }, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return Response.json({
                success: false,
                message: "Payload Panic! 🚨 Looks like your data threw a fit and refused to cooperate. Let's give it a makeover and try again. 🛠️💇‍♂️",
                errors: error.issues,
            }, { status: 400 });
        } else if (error instanceof MongooseError) {
            return Response.json({
                success: false,
                error: error.message,
                message: "Database Drama! 🚫🤹‍♂️ Your data just flopped its audition and didn't make it into the database cast. Let's give it another go with some valid data—Hollywood is calling! 🎬🌟",
            }, { status: 500 });
        }

        return Response.json({
            success: false,
            message: "Internal Server Meltdown! 🔥🤯 Your payload sent our server into a spiral of confusion. It’s currently curled up in a corner, questioning its life choices. Let's give it something it can actually understand! 🛠️💻",
        }, { status: 500 });
    }



}
