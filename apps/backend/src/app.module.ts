import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './modules/client/client.module';
import { PrismaModule } from './database/prisma.module';
import { BuildingModule } from './modules/building/building.module';
import { LocationModule } from './modules/location/location.module';

@Module({
  imports: [PrismaModule, ClientModule, BuildingModule, LocationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
