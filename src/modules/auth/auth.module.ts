import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module.js';
import { PasswordHasher } from './application/ports/password-hasher.js';
import { RegisterUserUseCase } from './application/register-user.use-case.js';
import { ScryptPasswordHasher } from './infrastructure/scrypt-password-hasher.js';
import { AuthController } from './presentation/auth.controller.js';


@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    RegisterUserUseCase,
    {
      provide: PasswordHasher,
      useClass: ScryptPasswordHasher,
    },
  ],
})
export class AuthModule {}
