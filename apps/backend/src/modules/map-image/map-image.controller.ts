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
import { MapImageService } from './map-image.service';
import { ZodResponse } from 'src/common/decorators/zod-response.decorator';
import {
  CreateMapImageDto,
  CreateMapImageSchema,
  MapImage,
  MapImageResponseSchema,
  UpdateMapImageDto,
  UpdateMapImageSchema,
} from '@aps/shared-types';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller('map-images')
export class MapImageController {
  constructor(private readonly mapImageService: MapImageService) {}

  @Get('map/:mapId')
  @ZodResponse(MapImageResponseSchema.array())
  async findAllByMap(@Param('mapId') mapId: string): Promise<MapImage[]> {
    return this.mapImageService.findAllByMap(mapId);
  }

  @Post()
  @ZodResponse(MapImageResponseSchema)
  @UsePipes(new ZodValidationPipe(CreateMapImageSchema))
  async create(
    @Body() createMapImageDto: CreateMapImageDto,
  ): Promise<MapImage> {
    return this.mapImageService.create(createMapImageDto);
  }

  @Get(':id')
  @ZodResponse(MapImageResponseSchema)
  async findOne(@Param('id') id: string): Promise<MapImage> {
    return this.mapImageService.findOne(id);
  }

  @Patch(':id')
  @ZodResponse(MapImageResponseSchema)
  @UsePipes(new ZodValidationPipe(UpdateMapImageSchema))
  async update(
    @Param('id') id: string,
    @Body() updateMapImageDto: UpdateMapImageDto,
  ): Promise<MapImage> {
    return this.mapImageService.update(id, updateMapImageDto);
  }

  @Delete(':id')
  @ZodResponse(MapImageResponseSchema)
  async delete(@Param('id') id: string) {
    return this.mapImageService.delete(id);
  }
}
