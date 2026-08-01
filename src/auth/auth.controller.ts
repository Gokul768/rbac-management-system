import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  // Register
  @Post('register')
  register(
    @Body() registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  // Login
  @Post('login')
  login(
    @Body() loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  // Refresh Access Token
  @Post('refresh')
  refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  // Logout
    // Logout
@Post('logout')
logout(
  @Body() refreshTokenDto: RefreshTokenDto,
) {
  return this.authService.logout(
    refreshTokenDto,
  );
}
}