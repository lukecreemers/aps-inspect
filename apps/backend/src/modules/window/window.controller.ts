import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
  GetWindowsQueryDto,
  GetWindowsQuerySchema,
} from '@aps/shared-types';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller('windows')
export class WindowController {
  constructor(private readonly windowService: WindowService) {}

  @Get()
  @ZodResponse(WindowResponseSchema.array())
  @UsePipes(new ZodValidationPipe(GetWindowsQuerySchema))
  async findWindows(@Query() query: GetWindowsQueryDto): Promise<Window[]> {
    return this.windowService.findWindows(query);
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
