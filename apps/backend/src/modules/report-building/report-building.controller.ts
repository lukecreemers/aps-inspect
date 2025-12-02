import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ReportBuildingService } from './report-building.service';
import { ReportBuilding } from '@prisma/client';
import { ZodResponse } from 'src/common/decorators/zod-response.decorator';
import {
  CreateReportBuildingDto,
  CreateReportBuildingSchema,
  GetReportBuildingsQueryDto,
  ReportBuildingResponseSchema,
} from '@aps/shared-types/src/report-building';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller('report-buildings')
export class ReportBuildingController {
  constructor(private reportBuildingService: ReportBuildingService) {}

  @Get()
  @ZodResponse(ReportBuildingResponseSchema.array())
  async findReportBuildings(
    @Query() query: GetReportBuildingsQueryDto,
  ): Promise<ReportBuilding[]> {
    return this.reportBuildingService.findReportBuildings(query);
  }

  @Post()
  @ZodResponse(ReportBuildingResponseSchema)
  @UsePipes(new ZodValidationPipe(CreateReportBuildingSchema))
  async create(
    @Body() createReportBuildingDto: CreateReportBuildingDto,
  ): Promise<ReportBuilding> {
    return this.reportBuildingService.create(createReportBuildingDto);
  }

  @Get(':id')
  @ZodResponse(ReportBuildingResponseSchema)
  async findOne(@Param('id') id: string): Promise<ReportBuilding> {
    return this.reportBuildingService.findOne(id);
  }

  @Delete(':id')
  @ZodResponse(ReportBuildingResponseSchema)
  async delete(@Param('id') id: string): Promise<ReportBuilding> {
    return this.reportBuildingService.delete(id);
  }
}
