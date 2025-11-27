import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { SubstrateService } from './substrate.service';
import { ZodResponse } from 'src/common/decorators/zod-response.decorator';
import {
  CreateSubstrateDto,
  CreateSubstrateSchema,
  Substrate,
  SubstrateResponseSchema,
  GetSubstratesQueryDto,
  GetSubstratesQuerySchema,
} from '@aps/shared-types';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller('substrates')
export class SubstrateController {
  constructor(private readonly substrateService: SubstrateService) {}

  @Get()
  @ZodResponse(SubstrateResponseSchema.array())
  @UsePipes(new ZodValidationPipe(GetSubstratesQuerySchema))
  async findSubstrates(
    @Query() query: GetSubstratesQueryDto,
  ): Promise<Substrate[]> {
    return this.substrateService.findSubstrates(query);
  }

  @Post()
  @ZodResponse(SubstrateResponseSchema)
  @UsePipes(new ZodValidationPipe(CreateSubstrateSchema))
  async create(
    @Body() createSubstrateDto: CreateSubstrateDto,
  ): Promise<Substrate> {
    return this.substrateService.create(createSubstrateDto);
  }

  @Get(':id')
  @ZodResponse(SubstrateResponseSchema)
  async findOne(@Param('id') id: string): Promise<Substrate> {
    return this.substrateService.findOne(id);
  }

  @Patch(':id/deactivate')
  @ZodResponse(SubstrateResponseSchema)
  async softDelete(@Param('id') id: string) {
    return this.substrateService.softDelete(id);
  }
}
