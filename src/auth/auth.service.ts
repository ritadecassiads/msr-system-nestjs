// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UserService } from '../user/user.service';
// import { User } from 'src/user/schemas/user.schema';
// import { Model } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectModel(User.name) private readonly userModel: Model<User>,
//     private usersService: UserService,
//     private jwtService: JwtService,
//   ) {}

//   async validateUser(username: string, password: string) {
//     const user = await this.usersService.getByUsername(username);

//     if (user && user.password === password) {
//       const { _id, name } = user;
//       return { id: _id, name };
//     }

//     return null;
//   }

//   async login(user: any) {
//     const payload = { user: user.user, sub: user.id };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
// }
