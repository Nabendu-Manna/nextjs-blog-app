import { NextRequest } from "next/server";
import {type JWTPayload } from 'jose';

export interface AuthorizedRequest extends NextRequest {
    user: string | JWTPayload;
}

export type AccessTokenPayload = {
    user_id: string;
    email: string;
    username: string;
}
export interface AccessTokenDecode extends JWTPayload {
    user_id: string;
    email: string;
    username: string;
}
export type RefreshTokenPayload = {
    user_secrete: string;
}
export interface RefreshTokenDecode extends JWTPayload {
    user_secrete: string;
}