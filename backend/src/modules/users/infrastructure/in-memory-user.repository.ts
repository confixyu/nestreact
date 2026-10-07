import type { User } from '../domain/user.entity.js';
import { UserRepository } from '../domain/user.repository.js';

export class InMemoryUserRepository implements UserRepository {
  private readonly users = new Map<string, User>();

  findById(id: string): Promise<User | null> {
    return Promise.resolve(this.users.get(id) ?? null);
  }

  findByEmail(email: string): Promise<User | null> {
    const normalized = email.trim().toLowerCase();
    const found = [...this.users.values()].find((u) => u.email === normalized);
    return Promise.resolve(found ?? null);
  }

  save(user: User): Promise<void> {
    this.users.set(user.id, user);
    return Promise.resolve();
  }
}