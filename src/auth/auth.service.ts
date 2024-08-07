import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      return null;
    }

    const payload = { username: user.username, sub: user._id, code: user.code }; // dados que desejo incluir no token
    return {
      access_token: this.jwtService.sign(payload), // retorna o token JWT como uma string
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (user && isPasswordValid) {
      const { password, ...result } = user; // desestruturação de user sem o password, separo as infos do usuario
      return result;
    }
    return null;
  }
}
