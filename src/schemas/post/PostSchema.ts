import { z } from 'zod';

export const PostSchema = z.object({
    title: z.string().max(50, "Maximum Length Exceeded [max length 50]! 🚫📏 Looks like your input went on a little rant there. Let's keep it short and sweet next time—our API prefers Haikus over novels! 📝🍃"),
    sub_title: z.string().max(200, "Data Overflow Alert [max length 200]! 🚫🌊 Your input is spilling over the edges! Time to trim it down—our API likes things short and snappy. ✂️📏"),
    body: z.string(),
    image: z.string().optional(),
    author: z.string().optional(),
});
