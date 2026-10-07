import { Injectable } from '@nestjs/common';
import type { User } from '../../users/domain/user.entity.js';
import { UserRepository } from '../../users/domain/user.repository.js';
import { InvalidCredentialsError } from '../domain/invalid-credentials.error.js';
import { PasswordHasher } from './ports/password-hasher.js';
import { TokenService } from './ports/token-service.js';

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResult {
  accessToken: string;
  user: User;
}

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly users: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokens: TokenService,
  ) {}

  async execute(input: LoginInput): Promise<LoginResult> {
    const user = await this.users.findByEmail(input.email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isValid = await this.passwordHasher.verify(user.passwordHash, input.password);
    if (!isValid) {
      throw new InvalidCredentialsError();
    }

    const accessToken = await this.tokens.sign({ userId: user.id, role: user.role });
    return { accessToken, user };
  }
}