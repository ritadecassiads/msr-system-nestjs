import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './schemas/employee.schema';
import * as bcrypt from 'bcrypt';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { CodeGeneratorUtil } from 'src/common/utils/code-generator.util';
import { ValidationService } from 'src/validation/validation.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private readonly employeeModel: Model<Employee>,
    private readonly validationService: ValidationService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    try {
      const hashedPassword = await this.cryptPassword(
        createEmployeeDto.password,
      );

      const isCpfValid = await this.validationService.validateCpf(
        createEmployeeDto.cpf,
      );

      if (!isCpfValid) {
        throw new BadRequestException('CPF inválido');
      }
      const code = await CodeGeneratorUtil.generateCode(this.employeeModel);

      const createdEmployee = new this.employeeModel({
        ...createEmployeeDto, // operador de espalhamento
        password: hashedPassword,
        code,
      });

      return await createdEmployee.save();
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      if (error.code === 11000) {
        throw new ConflictException(
          'Campos como username e cpf devem ser únicos.',
        );
      }

      throw new InternalServerErrorException(
        'Não foi possível cadastrar o usuário.',
      );
    }
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().select('-password').exec();
  }

  async findById(_id: string): Promise<Employee> {
    const employee = await this.employeeModel
      .findById(_id)
      .select('-password')
      .exec();
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
      throw new NotFoundException('Funcionário não encontrado');
    }
    return employeeUpdated;
  }

  async delete(_id: string): Promise<Employee> {
    const employee = await this.employeeModel.findByIdAndDelete(_id).exec();
    if (!employee) {
      throw new NotFoundException('Funcionário não encontrado');
    }
    return this.employeeModel.findByIdAndDelete(_id).exec();
  }

  async cryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
