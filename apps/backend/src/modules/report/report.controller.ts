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
import { ReportService } from './report.service';
import {
  CreateStandardReportDto,
  CreateStandardReportSchema,
  CreateSystemReportDto,
  CreateSystemReportSchema,
  GetReportsQueryDto,
  Report,
  ReportResponseSchema,
  UpdateReportDto,
  UpdateReportSchema,
} from '@aps/shared-types';
import { ZodResponse } from 'src/common/decorators/zod-response.decorator';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  @ZodResponse(ReportResponseSchema.array())
  async findReports(@Query() query: GetReportsQueryDto): Promise<Report[]> {
    return this.reportService.findReports(query);
  }

  @Post('system')
  @ZodResponse(ReportResponseSchema)
  @UsePipes(new ZodValidationPipe(CreateSystemReportSchema))
  async createSystemReport(
    @Body() createSystemReportDto: CreateSystemReportDto,
  ): Promise<Report> {
    return this.reportService.createSystemReport(createSystemReportDto);
  }

  @Post('standard')
  @ZodResponse(ReportResponseSchema)
  @UsePipes(new ZodValidationPipe(CreateStandardReportSchema))
  async createStandardReport(
    @Body() createStandardReportDto: CreateStandardReportDto,
  ): Promise<Report> {
    return this.reportService.createStandardReport(createStandardReportDto);
  }

  @Get(':id')
  @ZodResponse(ReportResponseSchema)
  async findOne(@Param('id') id: string): Promise<Report> {
    return this.reportService.findOne(id);
  }

  @Patch(':id')
  @ZodResponse(ReportResponseSchema)
  @UsePipes(new ZodValidationPipe(UpdateReportSchema))
  async update(
    @Param('id') id: string,
    @Body() updateReportDto: UpdateReportDto,
  ): Promise<Report> {
    return this.reportService.update(id, updateReportDto);
  }

  @Delete(':id')
  @ZodResponse(ReportResponseSchema)
  async delete(@Param('id') id: string): Promise<Report> {
    return this.reportService.delete(id);
  }
}
