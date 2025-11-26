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
import { RoofService } from './roof.service';
import { ZodResponse } from 'src/common/decorators/zod-response.decorator';
import {
  CreateRoofDto,
  CreateRoofSchema,
  Roof,
  RoofResponseSchema,
  UpdateRoofDto,
  UpdateRoofSchema,
} from '@aps/shared-types';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller('roofs')
export class RoofController {
  constructor(private readonly roofService: RoofService) {}

  @Get('building/:buildingId')
  @ZodResponse(RoofResponseSchema.array())
  async findAllByBuilding(
    @Param('buildingId') buildingId: string,
  ): Promise<Roof[]> {
    return this.roofService.findAllByBuilding(buildingId);
  }

  @Post()
  @ZodResponse(RoofResponseSchema)
  @UsePipes(new ZodValidationPipe(CreateRoofSchema))
  async create(@Body() createRoofDto: CreateRoofDto): Promise<Roof> {
    return this.roofService.create(createRoofDto);
  }

  @Get(':id')
  @ZodResponse(RoofResponseSchema)
  async findOne(@Param('id') id: string): Promise<Roof> {
    return this.roofService.findOne(id);
  }

  @Patch(':id')
  @ZodResponse(RoofResponseSchema)
  @UsePipes(new ZodValidationPipe(UpdateRoofSchema))
  async update(
    @Param('id') id: string,
    @Body() updateRoofDto: UpdateRoofDto,
  ): Promise<Roof> {
    return this.roofService.update(id, updateRoofDto);
  }

  @Delete(':id')
  @ZodResponse(RoofResponseSchema)
  async delete(@Param('id') id: string) {
    return this.roofService.delete(id);
  }
}
