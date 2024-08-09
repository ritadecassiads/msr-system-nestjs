import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './schemas/client.schema';
import { ResponseMenssage } from './dto/response-client.dto';
import { Employee } from 'src/employee/schemas/employee.schema';
import { CodeGeneratorUtil } from 'src/common/utils/code-generator.util';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
    @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    try {
      // Buscar o usuário pelo ID do mongo
      const employee = await this.employeeModel
        .findById(createClientDto.createdByEmployee)
        .exec();

      if (!employee) {
        throw new NotFoundException('Usuário não encontrado');
      }

      const code = await CodeGeneratorUtil.generateCode(this.clientModel);

      // Criar o cliente com a referência ao usuário
      const createdClient = new this.clientModel({
        ...createClientDto,
        code,
        createdByEmployee: employee,
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

  async findOne(_id: string): Promise<Client> {
    const client = await this.clientModel.findOne({ _id }).exec();
    if (!client) {
      throw new NotFoundException('Product not found');
    }
    return client;
  }

  async update(
    _id: string,
    updateClientDto: Partial<CreateClientDto>,
  ): Promise<ResponseMenssage> {
    const updatedClient = await this.clientModel
      .findOneAndUpdate({ _id }, { $set: updateClientDto }, { new: true })
      .exec();
    if (!updatedClient) {
      throw new NotFoundException('Product not found');
    }
    return updatedClient ? { message: 'Cliente atualizado com sucesso' } : null;
  }

  async delete(_id: string): Promise<ResponseMenssage> {
    const result = await this.clientModel.deleteOne({ _id }).exec();
    return result ? { message: 'Cliente deletado com sucesso' } : null;
  }
}
