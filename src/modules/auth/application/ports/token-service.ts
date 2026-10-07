import type { Role } from '../../../users/domain/role.js';

export interface AccessTokenPayload {
  userId: string;
  role: Role;
}

export abstract class TokenService {
  abstract sign(payload: AccessTokenPayload): Promise<string>;
  abstract verify(token: string): Promise<AccessTokenPayload>;
}