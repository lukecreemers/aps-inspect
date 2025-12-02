import { Body, Controller, Param, Post, UsePipes } from '@nestjs/common';
import { ContractorPullService } from './services/contractor-pull.service';
import {
  ControllerPullDto,
  ControllerPullResponse,
  ControllerPullResponseSchema,
  ControllerPullSchema,
} from '@aps/shared-types';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { ZodResponse } from 'src/common/decorators/zod-response.decorator';

@Controller('contractor-pull')
export class ContractorPullController {
  constructor(private readonly contractorPullService: ContractorPullService) {}

  @Post(':id/pull-work-block')
  @ZodResponse(ControllerPullResponseSchema)
  @UsePipes(new ZodValidationPipe(ControllerPullSchema))
  async pull(
    @Body() body: ControllerPullDto,
    @Param('id') id: string,
  ): Promise<ControllerPullResponse> {
    return this.contractorPullService.pull(body, id);
  }
}
