import { LoginDto } from '@aps/shared-types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Email not found. Please check your email and try again.',
      );
    }

    const isPasswordValid = this.verifyPassword(
      loginDto.password,
      user.passwordSalt,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Invalid password. Please check your password and try again.',
      );
    }

    return user;
  }

  private verifyPassword(
    password: string,
    salt: string,
    storedHash: string,
  ): boolean {
    const hash = this.hashPassword(password, salt);
    return hash === storedHash;
  }

  private hashPassword(password: string, salt: string): string {
    return crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
      .toString('hex');
  }
}
