import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Employee } from './schemas/employee.schema';
import { ValidationService } from '../validation/validation.service';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CodeGeneratorUtil } from '../common/utils/code-generator.util';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let validationService: ValidationService;
  let employeeModel: Model<Employee>;
  let employeeInstance: { save: jest.Mock };

  const mockEmployee = {
    _id: '61c0ccf11d7bf83d153d7c06',
    code: 124,
    name: 'Rita de Cassia Santos',
    username: 'ritinha',
    password: '1234567',
    cpf: '26219215400',
    email: 'rita@gmail.com',
    phone: '41997317647',
  };

  beforeEach(async () => {
    // jest.fn() cria uma função mock que você pode configurar para retornar valores específicos ou lançar erros
    employeeInstance = {
      save: jest.fn().mockResolvedValue({
        toObject: jest.fn().mockReturnValue({
          name: 'Rita de Cassia Santos',
          username: 'ritinha',
          cpf: '26219215400',
          email: 'rita@gmail.com',
          phone: '41997317647',
          code: 124,
        }),
      }),
    };

    // Mock como função construtora
    employeeModel = jest.fn().mockImplementation(() => employeeInstance) as any;

    // Adiciona os métodos necessários ao mock
    employeeModel.find = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockEmployee),
    });
    employeeModel.findOne = jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue({ code: 123 }),
    });
    employeeModel.findById = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockEmployee),
    });
    employeeModel.findByIdAndUpdate = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockEmployee),
    });
    employeeModel.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockEmployee),
    });
    employeeModel.create = jest.fn().mockResolvedValue(employeeInstance);

    jest.spyOn(CodeGeneratorUtil, 'generateCode').mockResolvedValue(123); // Mock para a função generateCode

    // Mock do bcrypt.hash
    jest.spyOn(bcrypt, 'genSalt').mockResolvedValue(12);
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed_1234567');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getModelToken(Employee.name),
          useValue: employeeModel,
        },
        {
          provide: ValidationService,
          useValue: {
            validateCpf: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
    validationService = module.get<ValidationService>(ValidationService);
    employeeModel = module.get<Model<Employee>>(getModelToken(Employee.name));
  });

  describe('create', () => {
    it('should create an employee successfully', async () => {
      const createEmployeeDto = {
        name: 'Rita de Cassia Santos',
        username: 'ritinha',
        cpf: '26219215400',
        email: 'rita@gmail.com',
        phone: '41997317647',
        password: '1234567',
      };

      jest.spyOn(validationService, 'validateCpf').mockResolvedValueOnce(true);

      const result = await service.create(createEmployeeDto);

      // Verificação para assegurar que bcrypt.hash foi chamado corretamente
      expect(bcrypt.hash).toHaveBeenCalledWith('1234567', 12);

      // Verificação para assegurar que o code foi gerado corretamente
      expect(CodeGeneratorUtil.generateCode).toHaveBeenCalledWith(
        employeeModel,
      );

      // Verificação do resultado retornado pelo método create
      expect(result).toEqual(
        expect.objectContaining({
          name: 'Rita de Cassia Santos',
          username: 'ritinha',
          cpf: '26219215400',
          email: 'rita@gmail.com',
          phone: '41997317647',
          code: 124,
        }),
      );
    });

    it('should throw ConflictException when username or cpf already exists', async () => {
      const createEmployeeDto = {
        username: 'testUser',
        password: 'testPassword',
        cpf: '26219215400',
        email: 'test@example.com',
        phone: '1234567890',
        name: 'Test User',
      };

      jest.spyOn(validationService, 'validateCpf').mockResolvedValueOnce(true);

      jest.spyOn(employeeInstance, 'save').mockImplementationOnce(() => {
        const error = new Error('Duplicate key error');
        (error as any).code = 11000;
        throw error;
      });

      await expect(service.create(createEmployeeDto as any)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw BadRequestException when CPF is invalid', async () => {
      const createEmployeeDto = {
        username: 'newUser',
        password: 'testPassword',
        cpf: '12345678910',
        email: 'test@example.com',
        phone: '1234567890',
        name: 'Test User',
      };

      jest.spyOn(validationService, 'validateCpf').mockResolvedValueOnce(false);

      await expect(service.create(createEmployeeDto as any)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findById', () => {
    it('should find and return a employee by ID', async () => {
      jest.spyOn(employeeModel, 'findById').mockReturnValue({
        select: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockEmployee),
      } as any);

      const result = await service.findById(mockEmployee._id);

      expect(employeeModel.findById).toHaveBeenCalledWith(mockEmployee._id);
      expect(result).toEqual(mockEmployee);
    });

    it('should throw BadRequestException if invalid ID is provided', async () => {
      const id = 'invalid-id';

      const isValidObjectIDMock = jest
        .spyOn(mongoose, 'isValidObjectId')
        .mockReturnValue(false);

      await expect(service.findById(id)).rejects.toThrow(BadRequestException);

      expect(isValidObjectIDMock).toHaveBeenCalledWith(id);
      isValidObjectIDMock.mockRestore();
    });

    it('should throw NotFoundException if employee is not found', async () => {
      // Configuração do mock para findById
      const selectMock = jest.fn().mockReturnThis();
      const execMock = jest.fn().mockResolvedValueOnce(null);

      // Retorno da cadeia de métodos encadeados findById -> select -> exec
      jest.spyOn(employeeModel, 'findById').mockReturnValueOnce({
        select: selectMock,
        exec: execMock,
      } as any);

      await expect(service.findById(mockEmployee._id)).rejects.toThrow(
        NotFoundException,
      );

      expect(employeeModel.findById).toHaveBeenCalledWith(mockEmployee._id);
    });
  });

  describe('findAll', () => {
    it('should return an array of employees', async () => {
      const result = await service.findAll();
      expect(employeeModel.find).toHaveBeenCalled();
      expect(result).toEqual(mockEmployee);
    });
  });

  describe('update', () => {
    it('should update an employee by id', async () => {
      const updateEmployeeDto = { name: 'Updated Name' };
      const updatedEmployee = { username: 'user1', ...updateEmployeeDto };

      jest.spyOn(employeeModel, 'findByIdAndUpdate').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(updatedEmployee),
      } as any);

      const result = await service.update('someId', updateEmployeeDto);

      expect(result).toEqual(updatedEmployee);
    });

    it('should throw NotFoundException if employee not found for update', async () => {
      jest.spyOn(employeeModel, 'findByIdAndUpdate').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await expect(service.update('invalidId', {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findByUsername', () => {
    it('should return an employee by username', async () => {
      const employee = { username: 'user1', password: 'hashedPassword' };

      jest.spyOn(employeeModel, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(employee),
      } as any);

      const result = await service.findByUsername('user1');

      expect(result).toEqual(employee);
    });
  });

  describe('delete', () => {
    it('should delete an employee by id', async () => {
      jest.spyOn(employeeModel, 'findByIdAndDelete').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockEmployee),
      } as any);

      const result = await service.delete('61c0ccf11d7bf83d153d7c06');

      expect(result).toEqual(mockEmployee);
    });

    it('should throw NotFoundException if employee not found for deletion', async () => {
      jest.spyOn(employeeModel, 'findByIdAndDelete').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      await expect(service.delete('invalidId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
