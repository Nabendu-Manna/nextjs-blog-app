import { SignJWT, jwtVerify } from 'jose';
import { AccessTokenDecode, AccessTokenPayload, RefreshTokenDecode, RefreshTokenPayload } from '@/types/token';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'your_access_token_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret';
const ACCESS_TOKEN_EXPIRES_IN = parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN || '1');
const REFRESH_TOKEN_EXPIRES_IN = parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN || '1440');

export const generateAccessTokens = async (payload: AccessTokenPayload) => {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * ACCESS_TOKEN_EXPIRES_IN;
    const accessToken = await new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(ACCESS_TOKEN_SECRET));

    return { accessToken };
};

export const generateRefreshTokens = async (payload: RefreshTokenPayload) => {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * REFRESH_TOKEN_EXPIRES_IN;
    const refreshToken = await new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(REFRESH_TOKEN_SECRET));

    return { refreshToken };
};

export const generateTokens = async ({ accessTokenPayload, refreshTokenPayload }: { accessTokenPayload: AccessTokenPayload, refreshTokenPayload: RefreshTokenPayload }) => {
    const { accessToken } = await generateAccessTokens(accessTokenPayload);
    const { refreshToken } = await generateRefreshTokens(refreshTokenPayload);
    return { accessToken, refreshToken };
};

export const verifyAccessToken = async (token: string): Promise<AccessTokenDecode | null> => {
    try {
        const { payload } = await jwtVerify<AccessTokenDecode>(token, new TextEncoder().encode(ACCESS_TOKEN_SECRET));
        return payload;
    } catch (err) {
        return null;
    }
};

export const verifyRefreshToken = async (token: string): Promise<RefreshTokenDecode | null> => {
    try {
        const { payload } = await jwtVerify<RefreshTokenDecode>(token, new TextEncoder().encode(REFRESH_TOKEN_SECRET));
        return payload;
    } catch (err) {
        return null;
    }
};