import { Module } from '@nestjs/common';
import { RoofController } from './roof.controller';
import { RoofService } from './roof.service';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RoofController],
  providers: [RoofService],
})
export class RoofModule {}
