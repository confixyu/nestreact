import { Injectable } from '@nestjs/common';
import { EmailAlreadyInUseError } from '../../users/domain/email-already-in-use.error.js';
import type { Role } from '../../users/domain/role.js';
import { User } from '../../users/domain/user.entity.js';
import { UserRepository } from '../../users/domain/user.repository.js';
import { PasswordHasher } from './ports/password-hasher.js';

export interface RegisterUserInput {
  email: string;
  password: string;
  name: string;
  role: Role;
}

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly users: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(input: RegisterUserInput): Promise<User> {
    const existing = await this.users.findByEmail(input.email);
    if (existing) {
      throw new EmailAlreadyInUseError(input.email);
    }

    const passwordHash = await this.passwordHasher.hash(input.password);
    const user = User.create({
      email: input.email,
      passwordHash,
      name: input.name,
      role: input.role,
    });

    await this.users.save(user);
    return user;
  }
}