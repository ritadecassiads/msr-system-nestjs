import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import {
  ResponseMenssage,
  EmployeeResponseDto,
} from './dto/response-employee.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeResponseDto> {
    return await this.employeeService.create(createEmployeeDto);
  }

  @Get()
  async findAll(): Promise<EmployeeResponseDto[]> {
    return this.employeeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EmployeeResponseDto> {
    const employee = await this.employeeService.findById(id);
    if (!employee) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return employee;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: Partial<CreateEmployeeDto>,
  ): Promise<ResponseMenssage> {
    const updatedEmployee = await this.employeeService.update(
      id,
      updateEmployeeDto,
    );
    if (!updatedEmployee) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return {
      message: 'Usuário atualizado com sucesso',
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseMenssage> {
    const deletedEmployee = await this.employeeService.delete(id);
    if (!deletedEmployee) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return {
      message: 'Usuário deletado com sucesso',
    };
  }
}
