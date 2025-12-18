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
import { ZodResponse } from 'src/common/decorators/zod-response.decorator';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { ReportWorkBlockService } from './report-work-block.service';
import {
  AddWorkUnitsToReportWorkBlockDto,
  AddWorkUnitsToReportWorkBlockSchema,
  CreateReportWorkBlockDto,
  CreateReportWorkBlockSchema,
  EmailReportWorkBlockDto,
  EmailReportWorkBlockSchema,
  GetReportWorkBlocksQueryDto,
  GetReportWorkBlocksQuerySchema,
  RemoveWorkUnitsFromReportWorkBlockDto,
  RemoveWorkUnitsFromReportWorkBlockSchema,
  ReportWorkBlock,
  ReportWorkBlockOverviewResponse,
  ReportWorkBlockOverviewResponseSchema,
  ReportWorkBlockResponseSchema,
  UpdateReportWorkBlockDto,
  UpdateReportWorkBlockSchema,
} from '@aps/shared-types';

@Controller('report-work-blocks')
export class ReportWorkBlockController {
  constructor(
    private readonly reportWorkBlockService: ReportWorkBlockService,
  ) {}

  @Get(':reportId/overview')
  @ZodResponse(ReportWorkBlockOverviewResponseSchema.array())
  async getOverview(
    @Param('reportId') reportId: string,
  ): Promise<ReportWorkBlockOverviewResponse[]> {
    return this.reportWorkBlockService.getOverview(reportId);
  }

  @Get()
  @ZodResponse(GetReportWorkBlocksQuerySchema.array())
  @UsePipes(new ZodValidationPipe(GetReportWorkBlocksQuerySchema))
  async findAll(
    @Query() query: GetReportWorkBlocksQueryDto,
  ): Promise<ReportWorkBlock[]> {
    return this.reportWorkBlockService.findAll(query);
  }

  @Post()
  @ZodResponse(ReportWorkBlockResponseSchema)
  @UsePipes(new ZodValidationPipe(CreateReportWorkBlockSchema))
  async create(
    @Body() createReportWorkBlockDto: CreateReportWorkBlockDto,
  ): Promise<ReportWorkBlock> {
    return this.reportWorkBlockService.create(createReportWorkBlockDto);
  }

  @Get(':id')
  @ZodResponse(ReportWorkBlockResponseSchema)
  async findOne(@Param('id') id: string): Promise<ReportWorkBlock> {
    return this.reportWorkBlockService.findOne(id);
  }

  @Patch(':id')
  @ZodResponse(ReportWorkBlockResponseSchema)
  @UsePipes(new ZodValidationPipe(UpdateReportWorkBlockSchema))
  async update(
    @Param('id') id: string,
    @Body() updateReportWorkBlockDto: UpdateReportWorkBlockDto,
  ): Promise<ReportWorkBlock> {
    return this.reportWorkBlockService.update(id, updateReportWorkBlockDto);
  }

  @Delete(':id')
  @ZodResponse(ReportWorkBlockResponseSchema)
  async delete(@Param('id') id: string): Promise<ReportWorkBlock> {
    return this.reportWorkBlockService.delete(id);
  }

  @Patch(':id/add-work-units')
  @ZodResponse(ReportWorkBlockResponseSchema)
  @UsePipes(new ZodValidationPipe(AddWorkUnitsToReportWorkBlockSchema))
  async addWorkUnitsToReportWorkBlock(
    @Param('id') id: string,
    @Body() addWorkUnitsToReportWorkBlockDto: AddWorkUnitsToReportWorkBlockDto,
  ): Promise<ReportWorkBlock> {
    return this.reportWorkBlockService.addWorkUnitsToReportWorkBlock(
      id,
      addWorkUnitsToReportWorkBlockDto,
    );
  }

  @Patch(':id/remove-work-units')
  @ZodResponse(ReportWorkBlockResponseSchema)
  @UsePipes(new ZodValidationPipe(RemoveWorkUnitsFromReportWorkBlockSchema))
  async removeWorkUnitsFromReportWorkBlock(
    @Param('id') id: string,
    @Body()
    removeWorkUnitsFromReportWorkBlockDto: RemoveWorkUnitsFromReportWorkBlockDto,
  ): Promise<ReportWorkBlock> {
    return this.reportWorkBlockService.removeWorkUnitsFromReportWorkBlock(
      id,
      removeWorkUnitsFromReportWorkBlockDto,
    );
  }

  @Patch(':id/regenerate-secret-text')
  @ZodResponse(ReportWorkBlockResponseSchema)
  async regenerateSecretText(
    @Param('id') id: string,
  ): Promise<ReportWorkBlock> {
    return this.reportWorkBlockService.regenerateSecretText(id);
  }

  @Post(':id/email-credentials')
  @UsePipes(new ZodValidationPipe(EmailReportWorkBlockSchema))
  async emailCredentials(
    @Param('id') id: string,
    @Body() emailReportWorkBlockDto: EmailReportWorkBlockDto,
  ): Promise<void> {
    return this.reportWorkBlockService.emailCredentials(
      id,
      emailReportWorkBlockDto,
    );
  }
}
