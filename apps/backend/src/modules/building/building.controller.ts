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

import { BuildingService } from './building.service';
import { ZodResponse } from 'src/common/decorators/zod-response.decorator';
import {
  BuildingResponseSchema,
  CreateBuildingDto,
  CreateBuildingSchema,
  UpdateBuildingDto,
  UpdateBuildingSchema,
} from '@aps/shared-types';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { Building } from '@aps/shared-types/src/generated/zod';
import {
  GetBuildingsQueryDto,
  GetBuildingsQuerySchema,
} from '@aps/shared-types/src/building/dto/get-building-query.dto';

@Controller('buildings')
export class BuildingController {
  constructor(private buildingService: BuildingService) {}

  @Get()
  @ZodResponse(BuildingResponseSchema.array())
  @UsePipes(new ZodValidationPipe(GetBuildingsQuerySchema))
  async findBuildings(
    @Query() query: GetBuildingsQueryDto,
  ): Promise<Building[]> {
    return this.buildingService.findBuildings(query);
  }

  // Creates a roof, gutter, substrate, and window for the building
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

  @Patch(':id/deactivate')
  @ZodResponse(BuildingResponseSchema)
  async softDelete(@Param('id') id: string): Promise<Building> {
    return this.buildingService.softDelete(id);
  }

  @Get('active/client/:clientId')
  @ZodResponse(BuildingResponseSchema.array())
  async findAllActiveByClient(
    @Param('clientId') clientId: string,
  ): Promise<Building[]> {
    return this.buildingService.findAllActiveByClient(clientId);
  }
}
