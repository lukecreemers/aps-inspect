import {
  LoginDto,
  RefreshTokenDto,
  User,
  UserResponse,
} from '@aps/shared-types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    const accessToken = await this.signAccessToken(user);
    const refreshToken = await this.signRefreshToken(user);

    const hashed = this.hashToken(refreshToken);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshTokenHash: hashed },
    });

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new UnauthorizedException('User not found');
    return user;
  }

  async refresh(refreshDto: RefreshTokenDto) {
    const { refreshToken } = refreshDto;

    const payload = await this.verifyRefreshToken(refreshToken);

    const user = await this.validateStoredRefreshToken(
      payload.userId,
      refreshToken,
    );

    const newAccessToken = await this.signAccessToken(user);
    const newRefreshToken = await this.signRefreshToken(user);

    const newHash = this.hashToken(newRefreshToken);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshTokenHash: newHash },
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  private async verifyRefreshToken(token: string): Promise<{ userId: string }> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch {
      throw new UnauthorizedException('Refresh token expired');
    }
  }

  private async validateStoredRefreshToken(
    userId: string,
    token: string,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const valid = this.hashToken(token) === user.refreshTokenHash;

    if (!valid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return user;
  }

  private signAccessToken(user: User) {
    return this.jwtService.signAsync(
      { userId: user.id, role: user.role },
      { expiresIn: '15m' },
    );
  }

  private signRefreshToken(user: User) {
    return this.jwtService.signAsync({ userId: user.id }, { expiresIn: '30d' });
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const hash = this.hashPassword(password, user.passwordSalt);

    if (hash !== user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  private hashPassword(password: string, salt: string): string {
    return crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
      .toString('hex');
  }

  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }
}
