import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma/prisma.service.js';
import type { User } from '../domain/user.entity.js';
import { UserRepository } from '../domain/user.repository.js';
import { UserMapper } from './user.mapper.js';
import { Prisma } from '../../../generated/prisma/client.js';
import { EmailAlreadyInUseError } from '../domain/email-already-in-use.error.js';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const raw = await this.prisma.user.findUnique({ where: { id } });
    return raw ? UserMapper.toDomain(raw) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const raw = await this.prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });
    return raw ? UserMapper.toDomain(raw) : null;
  }

  async save(user: User): Promise<void> {
  const data = UserMapper.toPersistence(user);
  try {
    await this.prisma.user.upsert({
      where: { id: data.id },
      create: data,
      update: data,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new EmailAlreadyInUseError(data.email);
    }
    throw error;
  }
}
}