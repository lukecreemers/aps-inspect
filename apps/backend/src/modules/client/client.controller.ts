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
import { ClientService } from './client.service';
import type {
  Client,
  CreateClientDto,
  UpdateClientDto,
} from '@aps/shared-types';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { CreateClientSchema, ClientResponseSchema } from '@aps/shared-types';
import { ZodResponse } from 'src/common/decorators/zod-response.decorator';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  @ZodResponse(ClientResponseSchema.array())
  async findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Post()
  @ZodResponse(ClientResponseSchema)
  @UsePipes(new ZodValidationPipe(CreateClientSchema))
  async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientService.create(createClientDto);
  }

  @Get(':id')
  @ZodResponse(ClientResponseSchema)
  async findOne(@Param('id') id: string): Promise<Client> {
    return this.clientService.findOne(id);
  }

  @Patch(':id')
  @ZodResponse(ClientResponseSchema)
  @UsePipes(new ZodValidationPipe(ClientResponseSchema))
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.clientService.delete(id);
  }
}
