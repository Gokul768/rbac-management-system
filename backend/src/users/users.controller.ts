import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth } from '@nestjs/swagger';

import { UsersService } from './users.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';

import { Roles } from '../auth/decorators/roles/roles.decorator';

@Controller('users')
@ApiBearerAuth()
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) {}


  // ================= CURRENT USER PROFILE =================

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(
    @Req() req: any,
  ) {

    const user =
      await this.usersService.findById(
        req.user.userId,
      );

    return {
      message: 'Profile fetched successfully',
      user,
    };
  }


  // ================= ADMIN ONLY =================

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin')
  adminRoute() {

    return {
      message: 'Admin Access Granted',
    };
  }
}