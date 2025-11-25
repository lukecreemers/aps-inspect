import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { ClientModule } from './modules/client/client.module';
import { PrismaModule } from './database/prisma.module';
import { BuildingModule } from './modules/building/building.module';

@Module({
  imports: [TestModule, ClientModule, BuildingModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
