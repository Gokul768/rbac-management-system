import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Audit,
  AuditDocument,
} from './schemas/audit.schema';

@Injectable()
export class AuditService {
  constructor(
    @InjectModel(Audit.name)
    private auditModel: Model<AuditDocument>,
  ) {}

  async createLog(
    user: string,
    action: string,
    resource: string,
  ) {
    return this.auditModel.create({
      user,
      action,
      resource,
    });
  }

  async findAll() {
    return this.auditModel
      .find()
      .sort({
        createdAt: -1,
      });
  }
}