import { z } from 'zod';
// import { responseMessage } from '@/utils';

const username = z.string().trim().min(1, 'Username is required').regex(/^[a-zA-Z0-9_]+$/, 'Username must be alphanumeric and can include underscores');
const email = z.string().email('Please use a valid email address');

export const UserSchema = z.object({
    username: username,
    email: email,
    password: z.string().min(8, 'Password must be at least 8 characters long')
        .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
});

export const RegisterRequestSchema = z.object({
    username: username,
    email: email,
    password: z.string().min(8, 'Password must be at least 8 characters long')
        .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
});

export const LoginRequestSchema = z.object({
    username: email.or(username),
    password: z.string().min(8, 'Password must be at least 8 characters long')
        .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
});

export const RefreshTokenSchema = z.object({
    refreshToken: z.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/, 'its dos\'t look like a refresh token'),
});