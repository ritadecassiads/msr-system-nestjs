import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseMenssage, UserResponseDto } from './dto/response-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, username, password, cpf, address, phone, isAdmin } =
      createUserDto;
    console.log('user:', createUserDto);

    //this.validateFields(createUserDto);

    try {
      await this.checkUsernameAvailability(username);
      const hashedPassword = await this.cryptPassword(password);
      const newCode = await this.generateCode();

      const newUser = new this.userModel({
        code: newCode,
        name,
        username,
        password: hashedPassword,
        cpf,
        address,
        phone,
        isAdmin: isAdmin ?? false,
      });

      return await newUser.save();
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      throw new Error(
        'Não foi possível cadastrar o usuário. Por favor, tente novamente.',
      );
    }
  }

  async findAll(): Promise<UserResponseDto[]> {
    return this.userModel.find().exec();
  }

  async findOne(code: number): Promise<UserResponseDto> {
    const user = await this.userModel.findOne({ code }).exec();
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  }

  async getByUsername(username: string): Promise<UserResponseDto> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  }

  async update(code: number, user: Partial<User>): Promise<UserResponseDto> {
    const userFounded = await this.userModel.findOne({ code }).exec();
    if (!userFounded) {
      throw new Error('Usuário não encontrado');
    }
    return this.userModel
      .findByIdAndUpdate(userFounded._id, user, { new: true })
      .exec();
  }

  async delete(code: number): Promise<User> {
    const user = await this.userModel.findOne({ code }).exec();
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return this.userModel.findOneAndDelete({ _id: user._id }).exec();
  }

  async cryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async checkUsernameAvailability(username: string) {
    const existingUser = await this.userModel.findOne({ username }).exec();
    if (existingUser) {
      throw new Error('Username já está em uso. Por favor, escolha outro.');
    }
  }

  async generateCode(): Promise<number> {
    const lastUser = await this.userModel.findOne({}).sort({ code: -1 }).exec();
    return lastUser ? lastUser.code + 1 : 1;
  }

  validateFields(createUserDto: CreateUserDto): ResponseMenssage {
    if (
      !createUserDto.name ||
      !createUserDto.username ||
      !createUserDto.password ||
      !createUserDto.cpf ||
      !createUserDto.address ||
      !createUserDto.phone
    ) {
      return {
        message: 'Falta informações necessárias para cadastrar o usuário',
      };
      throw new Error('Falta informações necessárias para cadastrar o usuário');
    }
  }

  // handleException() {
  //   return {
  //     error: { code: 500, message: 'Erro interno no servidor' },
  //   };
  // }
}
