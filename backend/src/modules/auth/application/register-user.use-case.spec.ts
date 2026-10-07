import { describe, expect, it } from 'vitest';

import { InMemoryUserRepository } from './../../users/infrastructure/in-memory-user.repository.js'; 
import { RegisterUserUseCase, RegisterUserInput } from './register-user.use-case.js';
import { Role } from '../../users/domain/role.js';
import { PasswordHasher } from './ports/password-hasher.js';
import { EmailAlreadyInUseError } from '../../users/domain/email-already-in-use.error.js';


class FakePasswordHasher extends PasswordHasher {
  hash(plain: string): Promise<string> {
    return Promise.resolve(`hashed:${plain}`);
  }

  verify(hash: string, plain: string): Promise<boolean> {
    return Promise.resolve(hash === `hashed:${plain}`);
  }
}

describe('RegisterUserUseCase', () => {
    let users: InMemoryUserRepository;
    let useCase: RegisterUserUseCase;

    const input: RegisterUserInput = {
        email: 'ana@example.com',
        password: 'secret123',
        name: 'Ana',
        role: Role.STUDENT,
    };

    beforeEach(() => {
        users = new InMemoryUserRepository();
        useCase = new RegisterUserUseCase(users, new FakePasswordHasher());
    });


    it('should save the new user', async () => {
    await useCase.execute(input);

    const saved = await users.findByEmail(input.email);
    expect(saved).not.toBeNull();
    expect(saved?.name).toBe('Ana');
  });

  it('should store the hashed password, never the plain one', async () => {
    const user = await useCase.execute(input);

    expect(user.passwordHash).toBe('hashed:secret123');
    expect(user.passwordHash).not.toBe(input.password);
  });

  it('should throw EmailAlreadyInUseError when the email is taken', async () => {
    await useCase.execute(input);

    await expect(useCase.execute(input)).rejects.toThrow(EmailAlreadyInUseError);
  });

  it('should treat emails as case-insensitive', async () => {
    await useCase.execute({ ...input, email: 'ANA@Example.com' });

    await expect(
      useCase.execute({ ...input, email: 'ana@example.com' }),
    ).rejects.toThrow(EmailAlreadyInUseError);
  });
});
