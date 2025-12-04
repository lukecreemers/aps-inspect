import {
  LoginDto,
  LoginSchema,
  RefreshTokenDto,
  RefreshTokenSchema,
} from '@aps/shared-types';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { AuthService } from './auth.service';
import { ZodResponse } from 'src/common/decorators/zod-response.decorator';
import {
  LoginResponse,
  LoginResponseSchema,
  RefreshTokenResponse,
  RefreshTokenResponseSchema,
  UserResponse,
  UserResponseSchema,
} from '@aps/shared-types/src/auth/output/login.output';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: {
    userId: string;
    role: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UsePipes(new ZodValidationPipe(LoginSchema))
  @ZodResponse(LoginResponseSchema)
  async login(@Body() body: LoginDto): Promise<LoginResponse> {
    return this.authService.login(body);
  }

  @Get('current-user')
  @ZodResponse(UserResponseSchema)
  @UseGuards(JwtAuthGuard)
  async currentUser(@Req() req: RequestWithUser): Promise<UserResponse> {
    return this.authService.getUserById(req.user.userId);
  }

  @Post('refresh')
  @UsePipes(new ZodValidationPipe(RefreshTokenSchema))
  @ZodResponse(RefreshTokenResponseSchema)
  async refresh(
    @Body() refreshToken: RefreshTokenDto,
  ): Promise<RefreshTokenResponse> {
    return this.authService.refresh(refreshToken);
  }
}
