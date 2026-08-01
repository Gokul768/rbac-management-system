import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Member,
  MemberDocument,
} from './schemas/member.schema';

import { CreateMemberDto } from './dto/create-member.dto';
import { QueryMemberDto } from './dto/query-member.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name)
    private memberModel: Model<MemberDocument>,
  ) {}

  

  // ================= CREATE MEMBER =================
  async create(createMemberDto: CreateMemberDto) {
    const member = new this.memberModel(createMemberDto);
    return member.save();
  }
  

  // ================= GET ALL MEMBERS =================
  async findAll(query: QueryMemberDto) {
    const {
      page = '1',
      limit = '5',
      search = '',
      sortBy = 'createdAt',
      order = 'desc',
    } = query;

    const currentPage = Number(page);
    const pageLimit = Number(limit);

    const filter: any = {};

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          email: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          phone: {
            $regex: search,
            $options: 'i',
          },
        },
      ];
    }

    const total = await this.memberModel.countDocuments(filter);

    const members = await this.memberModel
      .find(filter)
      .sort({
        [sortBy]: order === 'asc' ? 1 : -1,
      })
      .skip((currentPage - 1) * pageLimit)
      .limit(pageLimit);

    return {
      total,
      page: currentPage,
      limit: pageLimit,
      totalPages: Math.ceil(total / pageLimit),
      data: members,
    };
  }

  // ================= GET MEMBER BY ID =================
  async findOne(id: string) {
    const member = await this.memberModel.findById(id);

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    return member;
  }

  // ================= UPDATE MEMBER =================
  async update(
    id: string,
    updateMemberDto: Partial<CreateMemberDto>,
  ) {
    const member = await this.memberModel.findByIdAndUpdate(
      id,
      updateMemberDto,
      {
        new: true,
      },
    );

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    return member;
  }

  // ================= DELETE MEMBER =================
  async remove(id: string) {
    const member = await this.memberModel.findByIdAndDelete(id);

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    return {
      message: 'Member deleted successfully',
    };
  }
}