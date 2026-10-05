import { DomainError } from '../../../shared/domain/domain.error.js';
import { Role } from './role.js';

export interface UserProps {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateUserInput {
  email: string;
  passwordHash: string;
  name: string;
  role: Role;
}

export class User {
  private constructor(private readonly props: UserProps) {}

  static create(input: CreateUserInput): User {
    const name = input.name.trim();
    if (name.length === 0) {
      throw new DomainError('User name cannot be empty');
    }

    const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = input.email.trim().toLowerCase();
    if (!EMAIL_PATTERN.test(email)) {
      throw new DomainError('User email is not valid');
    }

    const now = new Date();
    return new User({
      id: crypto.randomUUID(),
      email: input.email.trim().toLowerCase(),
      passwordHash: input.passwordHash,
      name,
      role: input.role,
      createdAt: now,
      updatedAt: now,
    });
  }

  static restore(props: UserProps): User {
    return new User(props);
  }

  get id(): string {
    return this.props.id;
  }
  get email(): string {
    return this.props.email;
  }
  get passwordHash(): string {
    return this.props.passwordHash;
  }
  get name(): string {
    return this.props.name;
  }
  get role(): Role {
    return this.props.role;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  isTeacher(): boolean {
    return this.props.role === Role.TEACHER;
  }
}