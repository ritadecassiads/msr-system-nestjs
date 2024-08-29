import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from '../employee.controller';
import { EmployeeService } from '../employee.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { Employee } from '../schemas/employee.schema';
import { ResponseDto } from '../../common/dto/response.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../auth/auth.service';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;
  let jwtService: JwtService;

  const mockEmployee = {
    _id: '61c0ccf11d7bf83d153d7c06',
    code: 124,
    name: 'Rita de Cassia Santos',
    username: 'ritinha',
    password: '1234567',
    cpf: '076.031.634-12',
    email: 'rita@gmail.com',
    phone: '41997317647',
    isAdmin: true,
    admissionDate: new Date('2021-12-01'),
    address: {
      street: '123 Main St',
      number: '456',
      complement: 'Apt 789',
      city: 'São Paulo',
      state: 'SP',
      postalCode: '01001-000',
    },
  };

  beforeEach(async () => {
    const mockEmployeeService = {
      create: jest.fn().mockResolvedValue({
        name: 'John Doe',
        username: 'john',
        cpf: '123.456.789-00',
        email: 'john@example.com',
        phone: '1234567890',
        password: 'hashedPassword',
        address: {
          street: '123 Main St',
          number: '1',
          complement: '',
          city: 'City',
          state: 'State',
          postalCode: '12345',
        },
      }),
      findAll: jest.fn().mockResolvedValue([]),
      findById: jest.fn().mockResolvedValue(null),
      update: jest.fn().mockResolvedValue(null),
      delete: jest.fn().mockResolvedValue(null),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: EmployeeService,
          useValue: mockEmployeeService,
        },
        {
          provide: JwtService,
          useValue: {},
        },
        {
          provide: AuthService,
          useValue: {},
        },
        {
          provide: JwtAuthGuard,
          useClass: JwtAuthGuard,
        },
        {
          provide: RolesGuard,
          useClass: RolesGuard,
        },
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('create', () => {
    it('should create an employee and return a ResponseDto', async () => {
      const createEmployeeDto: CreateEmployeeDto = {
        name: 'John Doe',
        username: 'john',
        cpf: '123.456.789-00',
        email: 'john@example.com',
        phone: '1234567890',
        password: 'hashedPassword',
        address: {
          street: '123 Main St',
          number: '1',
          complement: '',
          city: 'City',
          state: 'State',
          postalCode: '12345',
        },
      };

      const result = await controller.create(createEmployeeDto);

      expect(result).toEqual(
        new ResponseDto('Usuário criado com sucesso', createEmployeeDto),
      );
      expect(service.create).toHaveBeenCalledWith(createEmployeeDto);
    });
  });

  //   describe('findAll', () => {
  //     it('should return an array of employees', async () => {
  //       const result = await controller.findAll();

  //       expect(result).toEqual([mockEmployee]);
  //       expect(service.findAll).toHaveBeenCalled();
  //     });
  //   });

  //   describe('findById', () => {
  //     it('should return an employee by ID', async () => {
  //       const result = await controller.findById('1');

  //       expect(result).toEqual(mockEmployee);
  //       expect(service.findById).toHaveBeenCalledWith('1');
  //     });

  //     it('should throw a NotFoundException if employee is not found', async () => {
  //       jest
  //         .spyOn(service, 'findById')
  //         .mockRejectedValueOnce(
  //           new NotFoundException('Funcionário não encontrado'),
  //         );

  //       await expect(controller.findById('1')).rejects.toThrow(NotFoundException);
  //     });
  //   });

  //   describe('update', () => {
  //     it('should update an employee and return a ResponseDto', async () => {
  //       const updateEmployeeDto: Partial<CreateEmployeeDto> = {
  //         email: 'newemail@example.com',
  //       };

  //       const result = await controller.update('1', updateEmployeeDto);

  //       expect(result).toEqual(
  //         new ResponseDto('Usuário atualizado com sucesso', mockEmployee),
  //       );
  //       expect(service.update).toHaveBeenCalledWith('1', updateEmployeeDto);
  //     });
  //   });

  //   describe('delete', () => {
  //     it('should delete an employee and return a ResponseDto', async () => {
  //       const result = await controller.delete('1');

  //       expect(result).toEqual(
  //         new ResponseDto('Usuário deletado com sucesso', mockEmployee),
  //       );
  //       expect(service.delete).toHaveBeenCalledWith('1');
  //     });
  //   });
});
