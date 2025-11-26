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
import { GutterService } from './gutter.service';
import { ZodResponse } from 'src/common/decorators/zod-response.decorator';
import {
  CreateGutterDto,
  CreateGutterSchema,
  Gutter,
  GutterResponseSchema,
  UpdateGutterDto,
  UpdateGutterSchema,
} from '@aps/shared-types';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller('gutters')
export class GutterController {
  constructor(private readonly gutterService: GutterService) {}

  @Get('building/:buildingId')
  @ZodResponse(GutterResponseSchema.array())
  async findAllByBuilding(
    @Param('buildingId') buildingId: string,
  ): Promise<Gutter[]> {
    return this.gutterService.findAllByBuilding(buildingId);
  }

  @Post()
  @ZodResponse(GutterResponseSchema)
  @UsePipes(new ZodValidationPipe(CreateGutterSchema))
  async create(@Body() createGutterDto: CreateGutterDto): Promise<Gutter> {
    return this.gutterService.create(createGutterDto);
  }

  @Get(':id')
  @ZodResponse(GutterResponseSchema)
  async findOne(@Param('id') id: string): Promise<Gutter> {
    return this.gutterService.findOne(id);
  }

  @Patch(':id/deactivate')
  @ZodResponse(GutterResponseSchema)
  async softDelete(@Param('id') id: string) {
    return this.gutterService.softDelete(id);
  }
}
