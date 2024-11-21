
import { postModel } from "@/model/Post.model";


export async function GET(request: Request) {
    await postModel.create({
        title: "Testing blog title",
        subTitle: "Testing blog subtitle",
        body: "Testing blog body",
    });
    return Response.json({ message: "API testing...", success: true }, { status: 200 });
}
