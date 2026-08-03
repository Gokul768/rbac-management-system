import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Member,
  MemberDocument,
} from './schemas/member.schema';

import { CreateMemberDto } from './dto/create-member.dto';
import { QueryMemberDto } from './dto/query-member.dto';

import { AuditService } from '../audit/audit.service';


@Injectable()
export class MembersService {

  constructor(
    @InjectModel(Member.name)
    private memberModel: Model<MemberDocument>,

    private readonly auditService: AuditService,
  ) {}


  // ================= CREATE MEMBER =================
  async create(
    createMemberDto: CreateMemberDto,
  ) {

    const existingMember =
      await this.memberModel.findOne({
        email: createMemberDto.email,
      });


    if (existingMember) {
      throw new ConflictException(
        'Email already exists',
      );
    }


    const member =
      await new this.memberModel(
        createMemberDto,
      ).save();


    await this.auditService.createLog(
      'Admin',
      'CREATE',
      member.name,
    );


    return member;
  }



  // ================= GET ALL MEMBERS =================
  async findAll(
    query: QueryMemberDto,
  ) {

    const {
      page = "1",
      limit = "5",
      search = "",
      role,
      status,
      sortBy = "createdAt",
      order = "desc",
    } = query;


    const currentPage = Number(page);
    const pageLimit = Number(limit);


    const filter: any = {};


    // Role Filter
    if (
      role &&
      role !== "All"
    ) {
      filter.role = role;
    }


    // Status Filter
    if (
      status &&
      status !== "All"
    ) {
      filter.status =
        status === "true";
    }



    // Search Filter
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



    const total =
      await this.memberModel.countDocuments(
        filter,
      );


    const members =
      await this.memberModel
        .find(filter)
        .sort({
          [sortBy]:
            order === 'asc'
              ? 1
              : -1,
        })
        .skip(
          (currentPage - 1) *
          pageLimit,
        )
        .limit(
          pageLimit,
        );


    return {
      total,
      page: currentPage,
      limit: pageLimit,
      totalPages:
        Math.ceil(
          total / pageLimit,
        ),
      data: members,
    };

  }




  // ================= GET MEMBER BY ID =================
  async findOne(
    id: string,
  ) {

    const member =
      await this.memberModel.findById(id);


    if (!member) {
      throw new NotFoundException(
        'Member not found',
      );
    }


    return member;

  }




  // ================= UPDATE MEMBER =================
  async update(
    id: string,
    updateMemberDto:
      Partial<CreateMemberDto>,
  ) {


    const member =
      await this.memberModel.findByIdAndUpdate(
        id,
        updateMemberDto,
        {
          new: true,
        },
      );


    if (!member) {
      throw new NotFoundException(
        'Member not found',
      );
    }



    await this.auditService.createLog(
      'Admin',
      'UPDATE',
      member.name,
    );



    return member;

  }





  // ================= DELETE MEMBER =================
  async remove(
    id: string,
  ) {


    const member =
      await this.memberModel.findByIdAndDelete(
        id,
      );


    if (!member) {
      throw new NotFoundException(
        'Member not found',
      );
    }



    await this.auditService.createLog(
      'Admin',
      'DELETE',
      member.name,
    );



    return {
      message:
        'Member deleted successfully',
    };

  }

}