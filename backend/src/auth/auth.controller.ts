import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  // Register
  @ApiOperation({
    summary: 'Register a new user',
  })
  @Post('register')
  register(
    @Body() registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  // Login
  @ApiOperation({
    summary: 'User Login',
  })
  @Post('login')
  login(
    @Body() loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  // Refresh Access Token
  @ApiOperation({
    summary: 'Refresh Access Token',
  })
  @Post('refresh')
  refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  // Logout
  @ApiOperation({
    summary: 'User Logout',
  })
  @Post('logout')
  logout(
    @Body() refreshTokenDto: RefreshTokenDto,
  ) {
    return this.authService.logout(
      refreshTokenDto,
    );
  }
}