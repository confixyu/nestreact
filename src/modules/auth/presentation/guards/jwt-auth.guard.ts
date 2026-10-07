import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from '../../application/ports/token-service.js';
import { InvalidTokenError } from '../../domain/invalid-token.error.js';
import type { AuthenticatedRequest } from '../authenticated-request.js';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator.js';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly tokens: TokenService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean | undefined>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractBearerToken(request);
    if (!token) {
      throw new InvalidTokenError();
    }

    request.user = await this.tokens.verify(token);
    return true;
  }

  private extractBearerToken(request: AuthenticatedRequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}