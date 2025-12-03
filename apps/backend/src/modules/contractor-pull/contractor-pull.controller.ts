import { Body, Controller, Param, Post, UsePipes } from '@nestjs/common';
import {
  ContractorPullDto,
  ContractorPullResponse,
  ContractorPullResponseSchema,
  ContractorPullDtoSchema,
} from '@aps/shared-types';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { ZodResponse } from 'src/common/decorators/zod-response.decorator';
import { ContractorPullService } from './services/contractor-pull.service';

@Controller('contractor-pull')
export class ContractorPullController {
  constructor(private readonly contractorPullService: ContractorPullService) {}

  @Post(':id/pull-work-block')
  @ZodResponse(ContractorPullResponseSchema)
  @UsePipes(new ZodValidationPipe(ContractorPullDtoSchema))
  async pull(
    @Body() body: ContractorPullDto,
    @Param('id') id: string,
  ): Promise<ContractorPullResponse> {
    return this.contractorPullService.pull(body, id);
  }
}
