import { Module } from '@nestjs/common';
import { BuildingController } from './building.controller';
import { BuildingService } from './building.service';
import { PrismaModule } from 'src/database/prisma.module';
import { BuildingCreatorService } from './building-creator.service';

@Module({
  imports: [PrismaModule],
  controllers: [BuildingController],
  providers: [BuildingService, BuildingCreatorService],
})
export class BuildingModule {}
