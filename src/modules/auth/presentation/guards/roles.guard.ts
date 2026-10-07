import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Role } from '../../../users/domain/role.js';
import type { AuthenticatedRequest } from '../authenticated-request.js';
import { ROLES_KEY } from '../decorators/roles.decorator.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[] | undefined>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<AuthenticatedRequest>();
    return user !== undefined && requiredRoles.includes(user.role);
  }
}