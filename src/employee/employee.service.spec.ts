import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './schemas/employee.schema';
import { ValidationService } from '../validation/validation.service';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let validationService: ValidationService;
  let employeeModel: Model<Employee>;
  let employeeInstance: { save: jest.Mock };

  const mockEmployee = {
    _id: '61c0ccf11d7bf83d153d7c06',
    code: 123,
    name: 'Rita de Cassia Santos',
    username: 'ritinha',
    password: '1234567',
    cpf: '076.031.634-12',
    email: 'rita@gmail.com',
    phone: '41997317647',
  };

  beforeEach(async () => {
    employeeInstance = {
      save: jest.fn(), // jest.fn() cria uma função mock que você pode configurar para retornar valores específicos ou lançar erros
    };

    // stubs para simular os métodos do banco
    employeeModel = {
      find: jest.fn().mockReturnThis(),
      findOne: jest.fn().mockReturnThis(),
      findById: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockEmployee),
      }),
      findByIdAndUpdate: jest.fn().mockReturnThis(),
      findByIdAndDelete: jest.fn().mockReturnThis(),
      exec: jest.fn(),
      create: jest.fn().mockResolvedValue(employeeInstance),
      save: jest.fn(),
      // Mock de construtor
      prototype: {
        save: jest.fn(),
      },
    } as any;

    // Simulação do retorno para findOne com sort e exec no generateCodes
    jest.spyOn(employeeModel, 'findOne').mockReturnValueOnce({
      sort: jest.fn().mockReturnThis(), // Simula o método sort
      exec: jest.fn().mockResolvedValueOnce({ code: 123 }), // Simula o retorno do exec
    } as any);

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

  // describe('create', () => {
  //   it('should create an employee successfully', async () => {
  //     const hashedPassword = 'hashedPassword';
  //     const createdEmployee = {
  //       ...mockEmployee,
  //       password: hashedPassword,
  //     };

  //     jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
  //     jest
  //       .spyOn(employeeInstance, 'save')
  //       .mockResolvedValueOnce(createdEmployee as any); // configura o retorno do método save

  //     const result = await service.create(mockEmployee);

  //     // Espera que a senha tenha sido removida no resultado e o código gerado seja 124
  //     expect(result).toEqual({
  //       ...mockEmployee,
  //       code: 124, // Ajuste o código conforme o retorno esperado
  //     });
  //     expect(bcrypt.hash).toHaveBeenCalledWith(
  //       mockEmployee.password,
  //       expect.any(Number),
  //     );
  //   });
  // });

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

    // it('should throw BadRequestException if invalid ID is provided', async () => {
    //   const id = 'invalid-id';

    //   const isValidObjectIDMock = jest
    //     .spyOn(mongoose, 'isValidObjectId')
    //     .mockReturnValue(false);

    //   await expect(bookService.findById(id)).rejects.toThrow(
    //     BadRequestException,
    //   );

    //   expect(isValidObjectIDMock).toHaveBeenCalledWith(id);
    //   isValidObjectIDMock.mockRestore();
    // });

    // it('should throw NotFoundException if book is not found', async () => {
    //   jest.spyOn(model, 'findById').mockResolvedValue(null);

    //   await expect(bookService.findById(mockBook._id)).rejects.toThrow(
    //     NotFoundException,
    //   );

    //   expect(model.findById).toHaveBeenCalledWith(mockBook._id);
    // });
  });

  // it('should throw ConflictException when username or cpf already exists', async () => {
  //   const createEmployeeDto = {
  //     username: 'testUser',
  //     password: 'testPassword',
  //     cpf: '12345678901',
  //     email: 'test@example.com',
  //     phone: '1234567890',
  //     name: 'Test User',
  //   };

  //   jest.spyOn(employeeInstance, 'save').mockImplementationOnce(() => {
  //     const error = new Error('Duplicate key error');
  //     (error as any).code = 11000;
  //     throw error;
  //   });

  //   await expect(service.create(createEmployeeDto as any)).rejects.toThrow(
  //     ConflictException,
  //   );
  // });

  // it('should throw BadRequestException when CPF is invalid', async () => {
  //   const createEmployeeDto = {
  //     username: 'testUser',
  //     password: 'testPassword',
  //     cpf: 'invalidCpf',
  //     email: 'test@example.com',
  //     phone: '1234567890',
  //     name: 'Test User',
  //   };

  //   jest.spyOn(validationService, 'validateCpf').mockResolvedValueOnce(false);

  //   await expect(service.create(createEmployeeDto as any)).rejects.toThrow(
  //     BadRequestException,
  //   );
  // });

  // it('should return an array of employees without password', async () => {
  //   const employees = [
  //     { username: 'user1', password: 'hashedPassword' },
  //     { username: 'user2', password: 'hashedPassword' },
  //   ];

  //   jest.spyOn(employeeModel, 'find').mockReturnValueOnce({
  //     select: jest.fn().mockReturnValueOnce({
  //       exec: jest.fn().mockResolvedValueOnce(employees),
  //     }),
  //   } as any);

  //   const result = await service.findAll();

  //   expect(result).toEqual([{ username: 'user1' }, { username: 'user2' }]);
  // });

  // it('should return an employee by id', async () => {
  //   const employee = { username: 'user1', password: 'hashedPassword' };

  //   jest.spyOn(employeeModel, 'findById').mockReturnValueOnce({
  //     select: jest.fn().mockReturnValueOnce({
  //       exec: jest.fn().mockResolvedValueOnce(employee),
  //     }),
  //   } as any);

  //   const result = await service.findById('someId');

  //   expect(result).toEqual({ username: 'user1' });
  // });

  // it('should return an employee by username', async () => {
  //   const employee = { username: 'user1', password: 'hashedPassword' };

  //   jest.spyOn(employeeModel, 'findOne').mockReturnValueOnce({
  //     exec: jest.fn().mockResolvedValueOnce(employee),
  //   } as any);

  //   const result = await service.findByUsername('user1');

  //   expect(result).toEqual(employee);
  // });

  // it('should throw NotFoundException if employee not found by username', async () => {
  //   jest.spyOn(employeeModel, 'findOne').mockReturnValueOnce({
  //     exec: jest.fn().mockResolvedValueOnce(null),
  //   } as any);

  //   await expect(service.findByUsername('invalidUsername')).rejects.toThrow(
  //     NotFoundException,
  //   );
  // });

  // it('should update an employee by id', async () => {
  //   const updateEmployeeDto = { name: 'Updated Name' };
  //   const updatedEmployee = { username: 'user1', ...updateEmployeeDto };

  //   jest.spyOn(employeeModel, 'findByIdAndUpdate').mockReturnValueOnce({
  //     exec: jest.fn().mockResolvedValueOnce(updatedEmployee),
  //   } as any);

  //   const result = await service.update('someId', updateEmployeeDto);

  //   expect(result).toEqual(updatedEmployee);
  // });

  // it('should throw NotFoundException if employee not found for update', async () => {
  //   jest.spyOn(employeeModel, 'findByIdAndUpdate').mockReturnValueOnce({
  //     exec: jest.fn().mockResolvedValueOnce(null),
  //   } as any);

  //   await expect(service.update('invalidId', {})).rejects.toThrow(
  //     NotFoundException,
  //   );
  // });

  // it('should delete an employee by id', async () => {
  //   const employee = { username: 'user1', password: 'hashedPassword' };

  //   jest.spyOn(employeeModel, 'findByIdAndDelete').mockReturnValueOnce({
  //     exec: jest.fn().mockResolvedValueOnce(employee),
  //   } as any);

  //   const result = await service.delete('someId');

  //   expect(result).toEqual(employee);
  // });

  // it('should throw NotFoundException if employee not found for deletion', async () => {
  //   jest.spyOn(employeeModel, 'findByIdAndDelete').mockReturnValueOnce({
  //     exec: jest.fn().mockResolvedValueOnce(null),
  //   } as any);

  //   await expect(service.delete('invalidId')).rejects.toThrow(
  //     NotFoundException,
  //   );
  // });
});
