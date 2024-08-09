import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './schemas/employee.schema';
import * as bcrypt from 'bcrypt';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeResponseDto } from './dto/response-employee.dto';
import { CodeGeneratorUtil } from 'src/common/utils/code-generator.util';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    try {
      //await this.checkEmployeenameAvailability(createEmployeeDto.username);
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
      console.log('error ---->', error);
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
    const employee = await this.employeeModel.findById({ _id }).exec();
    if (!employee) {
      throw new Error('Usuário não encontrado');
    }
    return employee;
  }

  async findByUsername(username: string): Promise<Employee> {
    const employee = await this.employeeModel.findOne({ username }).exec();

    if (!employee) {
      throw new Error('Usuário não encontrado');
    }
    return employee;
  }

  async update(
    _id: string,
    updateEmployeeDto: Partial<CreateEmployeeDto>,
  ): Promise<EmployeeResponseDto> {
    const employeeUpdated = await this.employeeModel
      .findOneAndUpdate({ _id }, { $set: updateEmployeeDto }, { new: true })
      .exec();
    if (!employeeUpdated) {
      throw new Error('Usuário não encontrado');
    }
    return employeeUpdated;
  }

  async delete(_id: string): Promise<Employee> {
    const employee = await this.employeeModel.findOne({ _id }).exec();
    if (!employee) {
      throw new Error('Usuário não encontrado');
    }
    return this.employeeModel.findOneAndDelete({ _id: employee._id }).exec();
  }

  async cryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async checkEmployeenameAvailability(username: string) {
    const existingEmployee = await this.employeeModel
      .findOne({ username })
      .exec();
    if (existingEmployee) {
      throw new ConflictException(
        'Employeename já está em uso. Por favor, escolha outro.',
      );
    }
  }
}
