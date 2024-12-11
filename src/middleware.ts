import { NextRequest, NextResponse } from 'next/server'
import { verifyAccessToken } from './utils';
import { AuthorizedRequest } from './types/token';

export async function middleware(request: NextRequest) {

    if (request.nextUrl.pathname.startsWith('/api')) {
        const token = request.headers.get('Authorization')?.split(' ')[1];
        if (!token) {
            return NextResponse.json({ success: false, message: 'No token provided' }, { status: 403 });
        }
        const jsonPayload = await verifyAccessToken(token);

        if (!jsonPayload) {
            return NextResponse.json({ success: false, message: 'Failed to authenticate token' }, { status: 401 });
        }
        (request as AuthorizedRequest).user = jsonPayload;
        return NextResponse.next();
    }
}


export const config = {
    matcher: [
        // "/api/:path*"
        "/api/post/:path*"
    ],
};