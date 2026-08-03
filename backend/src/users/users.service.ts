import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  // ================= CREATE USER =================

  async create(userData: Partial<User>) {
    const user = new this.userModel(userData);
    return user.save();
  }

  // ================= FIND USER BY EMAIL =================

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  // ================= FIND USER WITH PASSWORD =================

  async findByEmailWithPassword(email: string) {
    return this.userModel
      .findOne({ email })
      .select('+password');
  }

  // ================= GET USER BY ID =================

  async findById(id: string) {
    return this.userModel
      .findById(id)
      .select('-password');
  }
}