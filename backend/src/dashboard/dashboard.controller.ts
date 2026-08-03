import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import { DashboardService } from './dashboard.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';

import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Dashboard')
@ApiBearerAuth()
@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
  ) {}

  @ApiOperation({
    summary: 'Get Dashboard Statistics',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  getDashboard() {
    return this.dashboardService.getDashboardStats();
  }
}