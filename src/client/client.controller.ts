import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
  UseGuards,
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
    const newClient = await this.clientService.create(createClientDto);
    return new ResponseDto('Cliente criado com sucesso', newClient);
  }

  @Get()
  async findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Client> {
    const client = await this.clientService.findById(id);
    return client;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: Partial<CreateClientDto>,
  ): Promise<ResponseDto<Client>> {
    const updatedClient = await this.clientService.update(id, updateClientDto);
    return new ResponseDto('Cliente atualizado com sucesso', updatedClient);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<ResponseDto<Client>> {
    const deletedClient = await this.clientService.delete(id);
    return new ResponseDto('Cliente deletado com sucesso', deletedClient);
  }
}
