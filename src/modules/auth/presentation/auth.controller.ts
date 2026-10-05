import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { toUserResponse, type UserResponse } from '../../users/presentation/user.response.js';
import { RegisterUserUseCase } from '../application/register-user.use-case.js';
import { registerUserSchema, type RegisterUserDto } from './dto/register-user.dto.js';
import { LoginUseCase } from '../application/login.use-case.js';
import { loginSchema, type LoginDto } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly loginUser: LoginUseCase,
) {}

  @Post('register')
  async register(
    @Body({ schema: registerUserSchema }) body: RegisterUserDto,
  ): Promise<UserResponse> {
    const user = await this.registerUser.execute(body);
    return toUserResponse(user);
  }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async signIn(
        @Body({ schema: loginSchema }) body: LoginDto,
    ): Promise<{ accessToken: string; user: UserResponse }> {
        const { accessToken, user } = await this.loginUser.execute(body);
        return { accessToken, user: toUserResponse(user) };
    }
}