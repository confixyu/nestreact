import { z } from 'zod';

export const updateCourseSchema = z
  .object({
    title: z.string().trim().min(3).max(120).optional(),
    description: z.string().trim().max(2000).nullable().optional(),
  })
  .refine((data) => data.title !== undefined || data.description !== undefined, {
    message: 'At least one field must be provided',
  });

export type UpdateCourseDto = z.infer<typeof updateCourseSchema>;