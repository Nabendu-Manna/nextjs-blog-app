import { AccessTokenPayload, RefreshTokenDecode, RefreshTokenPayload } from '@/types/token';
import jwt, { Jwt, JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'your_access_token_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret';

export const generateAccessTokens = (payload: AccessTokenPayload) => {
    const accessToken = jwt.sign(
        { ...payload },
        ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '1m' }
    );

    return { accessToken };
};

export const generateRefreshTokens = (payload: RefreshTokenPayload) => {
    const refreshToken = jwt.sign(
        { ...payload },
        REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d' }
    );
    return { refreshToken };
};

export const generateTokens = ({ accessTokenPayload, refreshTokenPayload }: { accessTokenPayload: AccessTokenPayload, refreshTokenPayload: RefreshTokenPayload }) => {
    const { accessToken } = generateAccessTokens(accessTokenPayload);
    const { refreshToken } = generateRefreshTokens(refreshTokenPayload);
    return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string): string | JwtPayload | null => {
    try {
        return jwt.verify(token, ACCESS_TOKEN_SECRET);
    } catch (err) {
        return null;
    }
};

export const verifyRefreshToken = (token: string): string | RefreshTokenDecode | null => {
    try {
        return jwt.verify(token, REFRESH_TOKEN_SECRET) as RefreshTokenDecode;
    } catch (err) {
        return null;
    }
};

// export const verifyAccessTokena = async (req: NextRequest) => {
//     try {
//         const token = req.headers.get('Authorization')?.replace('Bearer ', '');
//         if (!token) { throw new Error(); }
//         const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
//         (req as AuthorizedRequest).user = decoded;
//         NextResponse.next();
//     } catch (err) {
//         NextResponse.json({ success: false, message: 'Please authenticate' }, { status: 401 });
//     }
// };