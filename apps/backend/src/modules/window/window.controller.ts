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
import { WindowService } from './window.service';
import { ZodResponse } from 'src/common/decorators/zod-response.decorator';
import {
  CreateWindowDto,
  CreateWindowSchema,
  Window,
  WindowResponseSchema,
  UpdateWindowDto,
  UpdateWindowSchema,
} from '@aps/shared-types';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller('windows')
export class WindowController {
  constructor(private readonly windowService: WindowService) {}

  @Get('building/:buildingId')
  @ZodResponse(WindowResponseSchema.array())
  async findAllByBuilding(
    @Param('buildingId') buildingId: string,
  ): Promise<Window[]> {
    return this.windowService.findAllByBuilding(buildingId);
  }

  @Post()
  @ZodResponse(WindowResponseSchema)
  @UsePipes(new ZodValidationPipe(CreateWindowSchema))
  async create(@Body() createWindowDto: CreateWindowDto): Promise<Window> {
    return this.windowService.create(createWindowDto);
  }

  @Get(':id')
  @ZodResponse(WindowResponseSchema)
  async findOne(@Param('id') id: string): Promise<Window> {
    return this.windowService.findOne(id);
  }

  @Patch(':id/deactivate')
  @ZodResponse(WindowResponseSchema)
  async softDelete(@Param('id') id: string) {
    return this.windowService.softDelete(id);
  }
}
