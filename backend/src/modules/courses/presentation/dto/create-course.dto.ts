import { z } from 'zod';

export const createCourseSchema = z.object({
    title: z.string().trim().min(1).max(100),
    description: z.string().trim().min(1).max(500),
});

export type CreateCourseDto = z.infer<typeof createCourseSchema>;