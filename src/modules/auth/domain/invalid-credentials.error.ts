import { UnauthorizedError } from '../../../shared/domain/domain.error.js';

export class InvalidCredentialsError extends UnauthorizedError {
  constructor() {
    super('Invalid email or password');
  }
}