import type { User as PrismaUser } from '../../../generated/prisma/client.js';
import { User } from '../domain/user.entity.js';

export class UserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.restore({
      id: raw.id,
      email: raw.email,
      passwordHash: raw.passwordHash,
      name: raw.name,
      role: raw.role,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(user: User) {
    return {
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      name: user.name,
      role: user.role,
    };
  }
}
