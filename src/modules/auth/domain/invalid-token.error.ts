import { UnauthorizedError } from '../../../shared/domain/domain.error.js';

export class InvalidTokenError extends UnauthorizedError {
  constructor() {
    super('Invalid or missing access token');
  }
};