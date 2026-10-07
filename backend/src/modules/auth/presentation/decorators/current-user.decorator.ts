import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { AccessTokenPayload } from '../../application/ports/token-service.js';
import { InvalidTokenError } from '../../domain/invalid-token.error.js';
import type { AuthenticatedRequest } from '../authenticated-request.js';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AccessTokenPayload => {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    if (!request.user) {
      throw new InvalidTokenError();
    }
    return request.user;
  },
);