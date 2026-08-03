import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  RefreshToken,
  RefreshTokenDocument,
} from './schemas/refresh-token.schema';


@Injectable()
export class RefreshTokenService {

  constructor(
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel:
      Model<RefreshTokenDocument>,
  ) {}


  async create(
    userId: string,
    token: string,
    expiresAt: Date,
  ) {
    return this.refreshTokenModel.create({
      userId,
      token,
      expiresAt,
    });
  }


  async findToken(token: string) {
    return this.refreshTokenModel.findOne({
      token,
    });
  }


  async removeToken(token: string) {
    return this.refreshTokenModel.deleteOne({
      token,
    });
  }


  async removeUserTokens(userId: string) {
    return this.refreshTokenModel.deleteMany({
      userId,
    });
  }

}