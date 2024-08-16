import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './schemas/client.schema';
import { CodeGeneratorUtil } from '../common/utils/code-generator.util';
import { ValidationService } from '../validation/validation.service';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
    private readonly validationService: ValidationService,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    try {
      await this.validationService.validateEmployee(
        createClientDto.createdByEmployee,
      );

      // const isCpfValid = await this.validationService.validateCpf(
      //   createClientDto.cpf,
      // );

      // if (!isCpfValid) {
      //   throw new BadRequestException('CPF inválido');
      // }
      // DESCOMENTAR DEPOIS

      const code = await CodeGeneratorUtil.generateCode(this.clientModel);

      const createdClient = new this.clientModel({
        ...createClientDto,
        code,
      });

      return createdClient.save();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Não foi possível cadastrar o usuário.',
      );
    }
  }

  async findAll(): Promise<Client[]> {
    return this.clientModel.find().populate('createdByEmployee', 'name').exec();
  }

  async findById(_id: string): Promise<Client> {
    const client = await this.clientModel
      .findById(_id)
      .populate('createdByEmployee', 'name')
      .exec();
    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return client;
  }

  async update(
    _id: string,
    updateClientDto: Partial<CreateClientDto>,
  ): Promise<Client> {
    const updatedClient = await this.clientModel
      .findByIdAndUpdate(_id, { $set: updateClientDto }, { new: true })
      .exec();
    if (!updatedClient) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return updatedClient;
  }

  async delete(_id: string): Promise<Client> {
    const deletedClient = await this.clientModel.findByIdAndDelete(_id).exec();
    if (!deletedClient) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return deletedClient;
  }
}
