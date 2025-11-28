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
import { ContractorService } from './contractor.service';
import { ZodResponse } from 'src/common/decorators/zod-response.decorator';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import {
  Contractor,
  ContractorResponseSchema,
  CreateContractorDto,
  CreateContractorSchema,
  GetContractorsQueryDto,
  GetContractorsQuerySchema,
  UpdateContractorDto,
  UpdateContractorSchema,
} from '@aps/shared-types';

@Controller('contractors')
export class ContractorController {
  constructor(private readonly contractorService: ContractorService) {}

  @Get()
  @ZodResponse(ContractorResponseSchema.array())
  @UsePipes(new ZodValidationPipe(GetContractorsQuerySchema))
  async findAll(@Query() query: GetContractorsQueryDto): Promise<Contractor[]> {
    return this.contractorService.findAll(query);
  }

  @Post()
  @ZodResponse(ContractorResponseSchema)
  @UsePipes(new ZodValidationPipe(CreateContractorSchema))
  async create(
    @Body() createContractorDto: CreateContractorDto,
  ): Promise<Contractor> {
    return this.contractorService.create(createContractorDto);
  }

  @Get(':id')
  @ZodResponse(ContractorResponseSchema)
  async findOne(@Param('id') id: string): Promise<Contractor> {
    return this.contractorService.findOne(id);
  }

  @Patch(':id')
  @ZodResponse(ContractorResponseSchema)
  @UsePipes(new ZodValidationPipe(UpdateContractorSchema))
  async update(
    @Param('id') id: string,
    @Body() updateContractorDto: UpdateContractorDto,
  ): Promise<Contractor> {
    return this.contractorService.update(id, updateContractorDto);
  }

  @Patch(':id/deactivate')
  @ZodResponse(ContractorResponseSchema)
  async softDelete(@Param('id') id: string): Promise<Contractor> {
    return this.contractorService.softDelete(id);
  }
}
