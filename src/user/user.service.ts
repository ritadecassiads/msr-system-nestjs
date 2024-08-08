import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/response-user.dto';
import { CodeGeneratorUtil } from 'src/common/utils/code-generator.util';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      await this.checkUsernameAvailability(createUserDto.username);
      const hashedPassword = await this.cryptPassword(createUserDto.password);
      const code = await CodeGeneratorUtil.generateCode(this.userModel);

      const createdUser = new this.userModel({
        ...createUserDto, // operador de espalhamento
        password: hashedPassword,
        code,
      });

      return await createdUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Username já está em uso');
      }
      throw new Error(
        'Não foi possível cadastrar o usuário. Por favor, tente novamente.',
      );
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(_id: string): Promise<User> {
    const user = await this.userModel.findById({ _id }).exec();
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).exec();

    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  }

  async update(_id: string, user: Partial<User>): Promise<UserResponseDto> {
    const userFounded = await this.userModel.findOne({ _id }).exec();
    if (!userFounded) {
      throw new Error('Usuário não encontrado');
    }
    return this.userModel
      .findByIdAndUpdate(userFounded._id, user, { new: true })
      .exec();
  }

  async delete(_id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id }).exec();
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
}
