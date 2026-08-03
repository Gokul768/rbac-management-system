import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  User,
  UserDocument,
  UserRole,
} from '../users/schemas/user.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getDashboardStats() {
    const totalUsers =
      await this.userModel.countDocuments();

    const totalAdmins =
      await this.userModel.countDocuments({
        role: UserRole.ADMIN,
      });

    const totalManagers =
      await this.userModel.countDocuments({
        role: UserRole.MANAGER,
      });

    const totalMembers =
      await this.userModel.countDocuments({
        role: UserRole.MEMBER,
      });

    return {
      totalUsers,
      totalAdmins,
      totalManagers,
      totalMembers,
    };
  }
}