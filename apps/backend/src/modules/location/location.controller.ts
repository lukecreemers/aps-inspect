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
import { LocationService } from './location.service';
import { ZodResponse } from 'src/common/decorators/zod-response.decorator';
import {
  CreateLocationDto,
  CreateLocationSchema,
  Location,
  LocationResponseSchema,
  UpdateLocationDto,
  UpdateLocationSchema,
} from '@aps/shared-types';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller('locations')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get('client/:clientId')
  @ZodResponse(LocationResponseSchema.array())
  async findAllByClient(
    @Param('clientId') clientId: string,
  ): Promise<Location[]> {
    return this.locationService.findAllByClient(clientId);
  }

  @Post()
  @ZodResponse(LocationResponseSchema)
  @UsePipes(new ZodValidationPipe(CreateLocationSchema))
  async create(
    @Body() createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    return this.locationService.create(createLocationDto);
  }

  @Get(':id')
  @ZodResponse(LocationResponseSchema)
  async findOne(@Param('id') id: string): Promise<Location> {
    return this.locationService.findOne(id);
  }

  @Patch(':id')
  @ZodResponse(LocationResponseSchema)
  @UsePipes(new ZodValidationPipe(UpdateLocationSchema))
  async update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    return this.locationService.update(id, updateLocationDto);
  }

  @Patch(':id/deactivate')
  @ZodResponse(LocationResponseSchema)
  async softDelete(@Param('id') id: string): Promise<Location> {
    return this.locationService.softDelete(id);
  }
}
