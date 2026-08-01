import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { QueryMemberDto } from './dto/query-member.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { Roles } from '../auth/decorators/roles/roles.decorator';

@Controller('members')
export class MembersController {
  constructor(
    private readonly membersService: MembersService,
  ) {}

  // ================= CREATE MEMBER =================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(
    @Body() createMemberDto: CreateMemberDto,
  ) {
    return this.membersService.create(createMemberDto);
  }

  // ================= GET ALL MEMBERS =================
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query() query: QueryMemberDto,
  ) {
    return this.membersService.findAll(query);
  }

  // ================= GET MEMBER BY ID =================
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.membersService.findOne(id);
  }

  // ================= UPDATE MEMBER =================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateMemberDto: Partial<CreateMemberDto>,
  ) {
    return this.membersService.update(
      id,
      updateMemberDto,
    );
  }

  // ================= DELETE MEMBER =================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.membersService.remove(id);
  }
}
