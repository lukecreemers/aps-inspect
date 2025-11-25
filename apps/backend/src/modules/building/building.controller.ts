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

import { BuildingService } from './building.service';
import { ZodResponse } from 'src/common/decorators/zod-response.decorator';
import {
  Building,
  BuildingResponseSchema,
  CreateBuildingDto,
  CreateBuildingSchema,
  UpdateBuildingDto,
  UpdateBuildingSchema,
} from '@aps/shared-types';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller('buildings')
export class BuildingController {
  constructor(private buildingService: BuildingService) {}

  @Get('client/:clientId')
  @ZodResponse(BuildingResponseSchema.array())
  async findAllByClient(
    @Param('clientId') clientId: string,
  ): Promise<Building[]> {
    return this.buildingService.findAllByClient(clientId);
  }

  @Post()
  @ZodResponse(BuildingResponseSchema)
  @UsePipes(new ZodValidationPipe(CreateBuildingSchema))
  async create(
    @Body() createBuildingDto: CreateBuildingDto,
  ): Promise<Building> {
    return this.buildingService.create(createBuildingDto);
  }

  @Get(':id')
  @ZodResponse(BuildingResponseSchema)
  async findOne(@Param('id') id: string): Promise<Building> {
    return this.buildingService.findOne(id);
  }

  @Patch(':id')
  @ZodResponse(BuildingResponseSchema)
  @UsePipes(new ZodValidationPipe(UpdateBuildingSchema))
  async update(
    @Param('id') id: string,
    @Body() updateBuildingDto: UpdateBuildingDto,
  ): Promise<Building> {
    return this.buildingService.update(id, updateBuildingDto);
  }

  @Delete(':id')
  @ZodResponse(BuildingResponseSchema)
  async delete(@Param('id') id: string): Promise<Building> {
    return this.buildingService.delete(id);
  }
}
