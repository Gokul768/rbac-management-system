import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Member, MemberDocument } from './schemas/member.schema';
import { CreateMemberDto } from './dto/create-member.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name)
    private memberModel: Model<MemberDocument>,
  ) {}

  // Create Member
  async create(createMemberDto: CreateMemberDto) {
    const member = new this.memberModel(createMemberDto);
    return member.save();
  }

  // Get All Members
  async findAll() {
    return this.memberModel.find();
  }

  // Get Member By ID
  async findOne(id: string) {
    return this.memberModel.findById(id);
  }
}