import { responseMessage } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    return NextResponse.json({ message: responseMessage.apiTesting, success: true }, { status: 200 });
}
