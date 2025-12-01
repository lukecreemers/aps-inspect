import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodResponse } from 'src/common/decorators/zod-response.decorator';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { ReportWorkBlockService } from './report-work-block.service';
import {
  CreateReportWorkBlockDto,
  CreateReportWorkBlockSchema,
  ReportWorkBlock,
  ReportWorkBlockResponseSchema,
} from '@aps/shared-types';

@Controller('report-work-blocks')
export class ReportWorkBlockController {
  constructor(
    private readonly reportWorkBlockService: ReportWorkBlockService,
  ) {}

  @Post()
  @ZodResponse(ReportWorkBlockResponseSchema)
  @UsePipes(new ZodValidationPipe(CreateReportWorkBlockSchema))
  async create(
    @Body() createReportWorkBlockDto: CreateReportWorkBlockDto,
  ): Promise<ReportWorkBlock> {
    return this.reportWorkBlockService.create(createReportWorkBlockDto);
  }
}
