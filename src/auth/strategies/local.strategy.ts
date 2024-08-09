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
    const employee = await this.authService.validateEmployeeByUsername(
      username,
      password,
    );
    if (!employee) {
      throw new UnauthorizedException();
    }
    return employee;
  }
}
