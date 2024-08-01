import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ResponseMenssage } from './dto/response-client.dto';
import { Client } from './schemas/client.schema';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    try {
      return await this.clientService.create(createClientDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Cliente já está cadastrado');
      }
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Client> {
    const client = await this.clientService.findOne(id);
    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return client;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: Partial<CreateClientDto>,
  ): Promise<ResponseMenssage> {
    const updatedClient = await this.clientService.update(id, updateClientDto);
    if (!updatedClient) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return {
      message: 'Cliente atualizado com sucesso',
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseMenssage> {
    const deletedClient = await this.clientService.delete(id);
    if (!deletedClient) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return {
      message: 'Cliente deletado com sucesso',
    };
  }
}
