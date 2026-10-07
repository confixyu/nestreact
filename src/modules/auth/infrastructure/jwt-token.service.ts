import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { type AccessTokenPayload, TokenService } from '../application/ports/token-service.js';
import { InvalidTokenError } from '../domain/invalid-token.error.js';
import { Role } from '../../users/domain/role.js';


interface JwtPayload {
  sub: string;
  role: Role;
}

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private readonly jwt: JwtService) {}

    sign(payload: AccessTokenPayload): Promise<string> {
        return this.jwt.signAsync({ sub: payload.userId, role: payload.role });
    }

    async verify(token: string): Promise<AccessTokenPayload> {
        try {
            const payload = await this.jwt.verifyAsync<JwtPayload>(token);
            return { userId: payload.sub, role: payload.role };
        } catch {
            throw new InvalidTokenError();
        }
    }
}