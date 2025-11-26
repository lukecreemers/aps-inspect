import { Module } from '@nestjs/common';
import { MapImageService } from './map-image.service';
import { MapImageController } from './map-image.controller';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MapImageController],
  providers: [MapImageService],
})
export class MapImageModule {}
