import { z } from 'zod';
// import { responseMessage } from '@/utils';

export const UserSchema = z.object({
    username: z.string().trim().min(1, 'Username is required').regex(/^[a-zA-Z0-9_]+$/, 'Username must be alphanumeric and can include underscores'),
    email: z.string().email('Please use a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long')
        .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
});


