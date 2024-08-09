import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './schemas/client.schema';
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

  async findOne(id: string): Promise<Client> {
    const client = await this.clientModel.findOne({ id }).exec();
    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return client;
  }

  async update(
    id: string,
    updateClientDto: Partial<CreateClientDto>,
  ): Promise<Client> {
    const updatedClient = await this.clientModel
      .findOneAndUpdate({ id }, { $set: updateClientDto }, { new: true })
      .exec();
    if (!updatedClient) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return updatedClient;
  }

  async delete(id: string): Promise<Client> {
    const deletedClient = await this.clientModel.findByIdAndDelete(id).exec();
    if (!deletedClient) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return deletedClient;
  }
}
