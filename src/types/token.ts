import { JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";

export interface AuthorizedRequest extends NextRequest {
    user: string | JwtPayload;
}

export type AccessTokenPayload = {
    user_id: string;
    email: string;
    username: string;
}
export type RefreshTokenPayload = {
    user_secrete: string;
}
export interface RefreshTokenDecode extends JwtPayload {
    user_secrete: string;
}