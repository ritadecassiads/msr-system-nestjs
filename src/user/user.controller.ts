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
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: User): Promise<User> {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Username já está em uso');
      }
      this.userService.handleException();
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':code')
  async findOne(@Param('code') code: number): Promise<User> {
    const user = await this.userService.findOne(code);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  @Get('username/:username')
  async getByUsername(@Param('username') username: string): Promise<User> {
    const user = await this.userService.getByUsername(username);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  @Put(':code')
  async update(
    @Param('code') code: number,
    @Body() updateUserDto: Partial<User>,
  ): Promise<User> {
    const updatedUser = await this.userService.update(code, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return updatedUser;
  }

  @Delete(':code')
  async delete(@Param('code') code: number): Promise<User> {
    const deletedUser = await this.userService.delete(code);
    if (!deletedUser) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return deletedUser;
  }
}
