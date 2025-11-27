import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { MapService } from './map.service';
import { ZodResponse } from 'src/common/decorators/zod-response.decorator';
import {
  CreateMapDto,
  CreateMapSchema,
  Map,
  MapResponseSchema,
  UpdateMapDto,
  UpdateMapSchema,
} from '@aps/shared-types';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller('maps')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get('client/:clientId')
  @ZodResponse(MapResponseSchema.array())
  async findAllByClient(@Param('clientId') clientId: string): Promise<Map[]> {
    return this.mapService.findAllByClient(clientId);
  }

  @Post()
  @ZodResponse(MapResponseSchema)
  @UsePipes(new ZodValidationPipe(CreateMapSchema))
  async create(@Body() createMapDto: CreateMapDto): Promise<Map> {
    return this.mapService.create(createMapDto);
  }

  @Get(':id')
  @ZodResponse(MapResponseSchema)
  async findOne(@Param('id') id: string): Promise<Map> {
    return this.mapService.findOne(id);
  }

  @Patch(':id')
  @ZodResponse(MapResponseSchema)
  @UsePipes(new ZodValidationPipe(UpdateMapSchema))
  async update(
    @Param('id') id: string,
    @Body() updateMapDto: UpdateMapDto,
  ): Promise<Map> {
    return this.mapService.update(id, updateMapDto);
  }
}
