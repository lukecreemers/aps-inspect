import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './modules/client/client.module';
import { PrismaModule } from './database/prisma.module';
import { BuildingModule } from './modules/building/building.module';
import { LocationModule } from './modules/location/location.module';
import { RoofModule } from './modules/roof/roof.module';
import { GutterModule } from './modules/gutter/gutter.module';
import { SubstrateModule } from './modules/substrate/substrate.module';
import { WindowModule } from './modules/window/window.module';
import { MapModule } from './modules/map/map.module';
import { MapImageModule } from './modules/map-image/map-image.module';
import { ReportModule } from './modules/report/report.module';
import { ReportTypeAssignmentModule } from './modules/report-type-assignment/report-type-assignment.module';

@Module({
  imports: [
    PrismaModule,
    ClientModule,
    BuildingModule,
    LocationModule,
    RoofModule,
    GutterModule,
    SubstrateModule,
    WindowModule,
    MapModule,
    MapImageModule,
    ReportModule,
    ReportTypeAssignmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
