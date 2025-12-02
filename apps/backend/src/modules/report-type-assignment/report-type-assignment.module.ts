import { Module } from '@nestjs/common';
import { ReportTypeAssignmentController } from './report-type-assignment.controller';
import { ReportTypeAssignmentService } from './report-type-assignment.service';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ReportTypeAssignmentController],
  providers: [ReportTypeAssignmentService],
})
export class ReportTypeAssignmentModule {}
