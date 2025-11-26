import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { SubstrateService } from './substrate.service';
import { ZodResponse } from 'src/common/decorators/zod-response.decorator';
import {
  CreateSubstrateDto,
  CreateSubstrateSchema,
  Substrate,
  SubstrateResponseSchema,
  UpdateSubstrateDto,
  UpdateSubstrateSchema,
} from '@aps/shared-types';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller('substrates')
export class SubstrateController {
  constructor(private readonly substrateService: SubstrateService) {}

  @Get('building/:buildingId')
  @ZodResponse(SubstrateResponseSchema.array())
  async findAllByBuilding(
    @Param('buildingId') buildingId: string,
  ): Promise<Substrate[]> {
    return this.substrateService.findAllByBuilding(buildingId);
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
