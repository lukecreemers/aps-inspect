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
import { ReportTypeAssignmentService } from './report-type-assignment.service';
import { ZodResponse } from 'src/common/decorators/zod-response.decorator';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import {
  CreateReportTypeAssignmentDto,
  CreateReportTypeAssignmentSchema,
  QueryReportTypeAssignmentDto,
  QueryReportTypeAssignmentSchema,
  ReportTypeAssignment,
  ReportTypeAssignmentResponseSchema,
} from '@aps/shared-types';

@Controller('report-type-assignments')
export class ReportTypeAssignmentController {
  constructor(
    private readonly reportTypeAssignmentService: ReportTypeAssignmentService,
  ) {}

  @Get()
  @ZodResponse(ReportTypeAssignmentResponseSchema.array())
  @UsePipes(new ZodValidationPipe(QueryReportTypeAssignmentSchema))
  async findAll(
    @Query() query: QueryReportTypeAssignmentDto,
  ): Promise<ReportTypeAssignment[]> {
    return this.reportTypeAssignmentService.findReportTypeAssignments(query);
  }

  @Post()
  @ZodResponse(ReportTypeAssignmentResponseSchema)
  @UsePipes(new ZodValidationPipe(CreateReportTypeAssignmentSchema))
  async create(
    @Body() createReportTypeAssignmentDto: CreateReportTypeAssignmentDto,
  ): Promise<ReportTypeAssignment> {
    return this.reportTypeAssignmentService.create(
      createReportTypeAssignmentDto,
    );
  }

  @Get(':id')
  @ZodResponse(ReportTypeAssignmentResponseSchema)
  async findOne(@Param('id') id: string): Promise<ReportTypeAssignment> {
    return this.reportTypeAssignmentService.findOne(id);
  }

  @Delete(':id')
  @ZodResponse(ReportTypeAssignmentResponseSchema)
  async delete(@Param('id') id: string): Promise<ReportTypeAssignment> {
    return this.reportTypeAssignmentService.delete(id);
  }
}
