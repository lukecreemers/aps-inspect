import { Module } from '@nestjs/common';
import { InspectionsService } from './inspections.service';
import { RoofInspectionService } from './roof-inspections.service';
import { GutterInspectionService } from './gutter-inspections.service';
import { WindowInspectionService } from './window-inspections.service';
import { SubstrateInspectionService } from './substrate-inspections.service';
import { PrismaModule } from 'src/database/prisma.module';
import { IssueInspectionService } from './issue-inspections.service';
import { SubIssueInspectionService } from './sub-issue-inspections.service';

@Module({
  imports: [PrismaModule],
  providers: [
    InspectionsService,
    RoofInspectionService,
    GutterInspectionService,
    WindowInspectionService,
    SubstrateInspectionService,
    IssueInspectionService,
    SubIssueInspectionService,
  ],
  exports: [
    RoofInspectionService,
    GutterInspectionService,
    WindowInspectionService,
    SubstrateInspectionService,
    IssueInspectionService,
    SubIssueInspectionService,
  ],
})
export class InspectionsModule {}
