import { Body, Controller, Post } from '@nestjs/common';
import { toUserResponse, type UserResponse } from '../../users/presentation/user.response.js';
import { RegisterUserUseCase } from '../application/register-user.use-case.js';
import { registerUserSchema, type RegisterUserDto } from './dto/register-user.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly registerUser: RegisterUserUseCase) {}

  @Post('register')
  async register(
    @Body({ schema: registerUserSchema }) body: RegisterUserDto,
  ): Promise<UserResponse> {
    const user = await this.registerUser.execute(body);
    return toUserResponse(user);
  }
}