import { z } from 'zod';
import { Role } from '../../../users/domain/role.js';

export const registerUserSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(72),
  name: z.string().trim().min(1).max(100),
  role: z.enum([Role.TEACHER, Role.STUDENT]),
});

export type RegisterUserDto = z.infer<typeof registerUserSchema>;