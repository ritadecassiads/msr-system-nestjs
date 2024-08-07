import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  ConflictException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseMenssage, UserResponseDto } from './dto/response-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Username já está em uso');
      }
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  @Put(':code')
  async update(
    @Param('code') code: number,
    @Body() updateUserDto: Partial<CreateUserDto>,
  ): Promise<ResponseMenssage> {
    const updatedUser = await this.userService.update(code, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return {
      message: 'Usuário atualizado com sucesso',
    };
  }

  @Delete(':code')
  async delete(@Param('code') code: number): Promise<ResponseMenssage> {
    const deletedUser = await this.userService.delete(code);
    if (!deletedUser) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return {
      message: 'Usuário deletado com sucesso',
    };
  }
}
