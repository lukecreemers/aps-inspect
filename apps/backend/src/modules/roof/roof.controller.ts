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
import { RoofService } from './roof.service';
import { ZodResponse } from 'src/common/decorators/zod-response.decorator';
import {
  CreateRoofDto,
  CreateRoofSchema,
  Roof,
  RoofResponseSchema,
  UpdateRoofDto,
  UpdateRoofSchema,
  GetRoofsQueryDto,
  GetRoofsQuerySchema,
} from '@aps/shared-types';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller('roofs')
export class RoofController {
  constructor(private readonly roofService: RoofService) {}

  @Get()
  @ZodResponse(RoofResponseSchema.array())
  @UsePipes(new ZodValidationPipe(GetRoofsQuerySchema))
  async findRoofs(@Query() query: GetRoofsQueryDto): Promise<Roof[]> {
    return this.roofService.findRoofs(query);
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

  @Patch(':id/deactivate')
  @ZodResponse(RoofResponseSchema)
  async softDelete(@Param('id') id: string) {
    return this.roofService.softDelete(id);
  }
}
