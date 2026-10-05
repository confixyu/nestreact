import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { type AccessTokenPayload, TokenService } from '../application/ports/token-service.js';

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private readonly jwt: JwtService) {}

  sign(payload: AccessTokenPayload): Promise<string> {
    return this.jwt.signAsync({ sub: payload.userId, role: payload.role });
  }
}