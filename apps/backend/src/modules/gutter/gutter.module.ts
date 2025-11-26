import { Module } from '@nestjs/common';
import { GutterService } from './gutter.service';
import { GutterController } from './gutter.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [GutterController],
  providers: [GutterService, PrismaService],
})
export class GutterModule {}
