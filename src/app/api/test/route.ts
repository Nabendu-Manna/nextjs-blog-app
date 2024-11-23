import { responseMessage } from "@/utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    return Response.json({ message: responseMessage.apiTesting, success: true }, { status: 200 });
}
