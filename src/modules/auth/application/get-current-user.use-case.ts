import { Injectable } from '@nestjs/common';
import type { User } from '../../users/domain/user.entity.js';
import { UserRepository } from '../../users/domain/user.repository.js';
import { InvalidTokenError } from '../domain/invalid-token.error.js';

@Injectable()
export class GetCurrentUserUseCase {
  constructor(private readonly users: UserRepository) {}

  async execute(userId: string): Promise<User> {
    const user = await this.users.findById(userId);
    if (!user) {
      throw new InvalidTokenError();
    }
    return user;
  }
}