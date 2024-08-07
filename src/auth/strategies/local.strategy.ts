import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  // chamado pelo LocalAuthGuard - valida o login - user e senha
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUserByUsername(
      username,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
