import { z, ZodType } from 'zod';
import { responseMessage } from '@/utils';

export const PostSchema = z.object({
    title: z.string().max(50, `${responseMessage.maxLengthError} [max length 50]`),
    subTitle: z.string().max(200, `${responseMessage.maxLengthError} [max length 200]`),
    body: z.string(),
    image: z.instanceof(File).refine(
        (file) =>
            [
                "image/jpeg",
                "image/jpg",
                "image/png",
            ].includes(file.type),
        { message: "Invalid document file type" }
    ).optional(),
    author: z.string().optional(),
});
