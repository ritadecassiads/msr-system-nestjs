import { Controller, Post, UseGuards, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  //@UseGuards(LocalAuthGuard)
  async login(@Body() loginDto: LoginDto) {
    console.log('loginDto TESTE', loginDto);

    return this.authService.login(loginDto);
  }
}
