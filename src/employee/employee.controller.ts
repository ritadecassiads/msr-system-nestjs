import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseDto } from '../common/dto/response.dto';
import { Employee } from './schemas/employee.schema';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<ResponseDto<Employee>> {
    const createdEmployee =
      await this.employeeService.create(createEmployeeDto);
    return new ResponseDto('Usuário criado com sucesso', createdEmployee);
  }

  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Employee> {
    const employee = await this.employeeService.findById(id);
    return employee;
  }

  @Get('username/:username')
  async findByUsername(@Param('username') username: string): Promise<Employee> {
    const employee = await this.employeeService.findByUsername(username);
    return employee;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: Partial<CreateEmployeeDto>,
  ): Promise<ResponseDto<Employee>> {
    const updatedEmployee = await this.employeeService.update(
      id,
      updateEmployeeDto,
    );
    return new ResponseDto('Usuário atualizado com sucesso', updatedEmployee);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<ResponseDto<Employee>> {
    const deletedEmployee = await this.employeeService.delete(id);
    return new ResponseDto('Usuário deletado com sucesso', deletedEmployee);
  }
}
