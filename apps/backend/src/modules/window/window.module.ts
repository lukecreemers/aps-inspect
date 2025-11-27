import { Module } from '@nestjs/common';
import { WindowService } from './window.service';
import { WindowController } from './window.controller';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WindowController],
  providers: [WindowService],
})
export class WindowModule {}
