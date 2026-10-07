import { z } from 'zod';

export const enrollSchema = z.object({
  courseId: z.uuid(),
});

export type EnrollDto = z.infer<typeof enrollSchema>;