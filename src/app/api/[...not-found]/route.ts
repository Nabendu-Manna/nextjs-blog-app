
import { NextRequest, NextResponse } from "next/server";

function notFound() {
    return NextResponse.json({ message: "Invalid endpoint" }, { status: 404 });
}

export async function GET(request: Request) { return notFound(); }

export async function HEAD(request: Request) { return notFound(); }

export async function POST(request: Request) { return notFound(); }

export async function PUT(request: Request) { return notFound(); }

export async function DELETE(request: Request) { return notFound(); }

export async function PATCH(request: Request) { return notFound(); }

export async function OPTIONS(request: Request) { return notFound(); }