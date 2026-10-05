import type { Role } from '../domain/role.js';
import type { User } from '../domain/user.entity.js';

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
}

export function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt.toISOString(),
  };
}