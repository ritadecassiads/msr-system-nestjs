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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseDto } from '../common/dto/response.dto';
import { SaleService } from 'src/sale/sale.service';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService, private readonly saleService: SaleService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
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

  @Get(':id/installments')
  async getClientInstallments(@Param('id') id: string) {
    return this.saleService.findSalesByClient(id);
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
