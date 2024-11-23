import { responseMessage } from '@/utils';
import { z } from 'zod';

export const PostSchema = z.object({
    title: z.string().max(50, `${responseMessage.maxLengthError} [max length 50]`),
    subTitle: z.string().max(200, `${responseMessage.maxLengthError} [max length 200]`),
    body: z.string(),
    image: z.string().optional(),
    author: z.string().optional(),
});
