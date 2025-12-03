import { LoginDto, LoginSchema } from '@aps/shared-types';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { AuthService } from './auth.service';
import { ZodResponse } from 'src/common/decorators/zod-response.decorator';
import {
  LoginResponse,
  LoginResponseSchema,
} from '@aps/shared-types/src/auth/output/login.output';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UsePipes(new ZodValidationPipe(LoginSchema))
  @ZodResponse(LoginResponseSchema)
  async login(@Body() body: LoginDto): Promise<LoginResponse> {
    return this.authService.login(body);
  }
}
