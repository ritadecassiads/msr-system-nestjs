import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './schemas/employee.schema';
import * as bcrypt from 'bcrypt';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { CodeGeneratorUtil } from 'src/common/utils/code-generator.util';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    try {
      const hashedPassword = await this.cryptPassword(
        createEmployeeDto.password,
      );
      const code = await CodeGeneratorUtil.generateCode(this.employeeModel);

      const createdEmployee = new this.employeeModel({
        ...createEmployeeDto, // operador de espalhamento
        password: hashedPassword,
        code,
      });

      return await createdEmployee.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          'Campos como username e cpf devem ser únicos.',
        );
      }
      throw new Error(
        'Não foi possível cadastrar o usuário. Por favor, tente novamente.',
      );
    }
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async findById(_id: string): Promise<Employee> {
    const employee = await this.employeeModel.findById(_id).exec();
    if (!employee) {
      throw new Error('Funcionário não encontrado');
    }
    return employee;
  }

  async findByUsername(username: string): Promise<Employee> {
    const employee = await this.employeeModel.findOne({ username }).exec();

    if (!employee) {
      throw new Error('Funcionário não encontrado');
    }
    return employee;
  }

  async update(
    _id: string,
    updateEmployeeDto: Partial<CreateEmployeeDto>,
  ): Promise<Employee> {
    const employeeUpdated = await this.employeeModel
      .findByIdAndUpdate(_id, updateEmployeeDto, { new: true })
      .exec();
    if (!employeeUpdated) {
      throw new Error('Funcionário não encontrado');
    }
    return employeeUpdated;
  }

  async delete(_id: string): Promise<Employee> {
    const employee = await this.employeeModel.findByIdAndDelete(_id).exec();
    if (!employee) {
      throw new Error('Funcionário não encontrado');
    }
    return this.employeeModel.findByIdAndDelete(_id).exec();
  }

  async cryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
