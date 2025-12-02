import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ReportWorkUnitService } from './report-work-unit.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { ZodResponse } from 'src/common/decorators/zod-response.decorator';
import {
  GetReportWorkUnitsQueryDto,
  ReportWorkUnitResponseSchema,
  UpdateReportWorkUnitDto,
  UpdateReportWorkUnitSchema,
} from '@aps/shared-types';
import { CreateReportWorkUnitSchema } from '@aps/shared-types';
import { CreateReportWorkUnitDto } from '@aps/shared-types';
import { ReportWorkUnit } from '@aps/shared-types';

@Controller('report-work-units')
export class ReportWorkUnitController {
  constructor(private readonly reportWorkUnitService: ReportWorkUnitService) {}

  @Get()
  @ZodResponse(ReportWorkUnitResponseSchema.array())
  async findReportWorkUnits(
    @Query() query: GetReportWorkUnitsQueryDto,
  ): Promise<ReportWorkUnit[]> {
    return this.reportWorkUnitService.findReportWorkUnits(query);
  }

  @Post()
  @ZodResponse(ReportWorkUnitResponseSchema)
  @UsePipes(new ZodValidationPipe(CreateReportWorkUnitSchema))
  async create(
    @Body() createReportWorkUnitDto: CreateReportWorkUnitDto,
  ): Promise<ReportWorkUnit> {
    return this.reportWorkUnitService.create(createReportWorkUnitDto);
  }

  @Get(':id')
  @ZodResponse(ReportWorkUnitResponseSchema)
  async findOne(@Param('id') id: string): Promise<ReportWorkUnit> {
    return this.reportWorkUnitService.findOne(id);
  }

  @Patch(':id')
  @ZodResponse(ReportWorkUnitResponseSchema)
  @UsePipes(new ZodValidationPipe(UpdateReportWorkUnitSchema))
  async update(
    @Param('id') id: string,
    @Body() updateReportWorkUnitDto: UpdateReportWorkUnitDto,
  ): Promise<ReportWorkUnit> {
    return this.reportWorkUnitService.update(id, updateReportWorkUnitDto);
  }

  @Delete(':id')
  @ZodResponse(ReportWorkUnitResponseSchema)
  async delete(@Param('id') id: string): Promise<ReportWorkUnit> {
    return this.reportWorkUnitService.delete(id);
  }
}
