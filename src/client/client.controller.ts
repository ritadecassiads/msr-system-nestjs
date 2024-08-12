import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  NotFoundException,
  ConflictException,
  Patch,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './schemas/client.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ResponseDto } from 'src/common/dto/response.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createClientDto: CreateClientDto,
  ): Promise<ResponseDto<Client>> {
    try {
      const newClient = await this.clientService.create(createClientDto);
      return new ResponseDto('Cliente criado com sucesso', newClient);
    } catch (error) {
      console.log('error ----> ', error);

      if (error.code === 11000) {
        throw new ConflictException('Cliente já está cadastrado');
      }
      if (error instanceof BadRequestException) {
        throw new BadRequestException('Dados inválidos fornecidos.');
      }
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Vendedor não encontrado.');
      }
    }
  }

  @Get()
  async findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Client> {
    const client = await this.clientService.findById(id);
    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return client;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: Partial<CreateClientDto>,
  ): Promise<ResponseDto<Client>> {
    const updatedClient = await this.clientService.update(id, updateClientDto);
    if (!updatedClient) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return new ResponseDto('Cliente atualizado com sucesso', updatedClient);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<ResponseDto<Client>> {
    const deletedClient = await this.clientService.delete(id);
    if (!deletedClient) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return new ResponseDto('Cliente deletado com sucesso', deletedClient);
  }
}
