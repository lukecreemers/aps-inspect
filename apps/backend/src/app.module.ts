import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { ClientModule } from './modules/client/client.module';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [TestModule, ClientModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
