import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { MembersController } from './members.controller';
import { MembersService } from './members.service';

import {
  Member,
  MemberSchema,
} from './schemas/member.schema';

import { AuthModule } from '../auth/auth.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    AuthModule,
    PassportModule,

    MongooseModule.forFeature([
      {
        name: Member.name,
        schema: MemberSchema,
      },
    ]),

    AuditModule,
  ],

  controllers: [MembersController],

  providers: [MembersService],

  exports: [MembersService],
})
export class MembersModule {}