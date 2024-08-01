import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './schemas/client.schema';
import { ResponseMenssage } from './dto/response-client.dto';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    try {
      // Buscar o usuário pelo ID do mongo
      const user = await this.userModel
        .findById(createClientDto.createdByUser)
        .exec();

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      const code = await this.generateCode();

      // Criar o cliente com a referência ao usuário
      const createdClient = new this.clientModel({
        ...createClientDto,
        code,
        createdByUser: user,
      });

      return createdClient.save();
    } catch (error) {
      throw new Error(
        'Não foi possível cadastrar o usuário. Por favor, tente novamente.',
      );
    }
  }

  async findAll(): Promise<Client[]> {
    return this.clientModel.find().exec();
  }

  async findOne(code: string): Promise<Client> {
    const client = await this.clientModel.findOne({ code }).exec();
    if (!client) {
      throw new NotFoundException('Product not found');
    }
    return client;
  }

  async update(
    code: string,
    updateClientDto: Partial<CreateClientDto>,
  ): Promise<ResponseMenssage> {
    const updatedClient = await this.clientModel
      .findOneAndUpdate({ code }, updateClientDto, { new: true })
      .exec();
    if (!updatedClient) {
      throw new NotFoundException('Product not found');
    }
    return updatedClient ? { message: 'Cliente atualizado com sucesso' } : null;
  }

  async delete(code: string): Promise<ResponseMenssage> {
    const result = await this.clientModel.deleteOne({ code }).exec();
    return result ? { message: 'Cliente deletado com sucesso' } : null;
  }

  async generateCode(): Promise<number> {
    const lastClient = await this.clientModel
      .findOne({})
      .sort({ code: -1 })
      .exec();
    return lastClient ? lastClient.code + 1 : 1;
  }
}
