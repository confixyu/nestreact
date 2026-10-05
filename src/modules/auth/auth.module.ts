import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module.js';
import { PasswordHasher } from './application/ports/password-hasher.js';
import { RegisterUserUseCase } from './application/register-user.use-case.js';
import { ScryptPasswordHasher } from './infrastructure/scrypt-password-hasher.js';
import { AuthController } from './presentation/auth.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginUseCase } from './application/login.use-case.js';
import { TokenService } from './application/ports/token-service.js';
import { JwtTokenService } from './infrastructure/jwt-token.service.js';


@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: Number(config.getOrThrow<string>('JWT_EXPIRES_IN_SECONDS')),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    RegisterUserUseCase,
    LoginUseCase,
    {
      provide: PasswordHasher,
      useClass: ScryptPasswordHasher,
    },
    { 
        provide: TokenService, 
        useClass: JwtTokenService 
    },
  ],
})
export class AuthModule {}
