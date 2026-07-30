import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy/jwt.strategy';

import { RolesGuard } from './guards/roles/roles.guard';

import {
  RefreshToken,
  RefreshTokenSchema,
} from './schemas/refresh-token.schema';


@Module({

  imports: [

    UsersModule,

    PassportModule,


    // Refresh Token Collection Register
    MongooseModule.forFeature([
      {
        name: RefreshToken.name,
        schema: RefreshTokenSchema,
      },
    ]),


    JwtModule.register({

      secret:
        process.env.JWT_ACCESS_SECRET ||
        'access_secret_123456',

      signOptions: {
        expiresIn: 900, // 15 minutes
      },

    }),

  ],


  controllers: [
    AuthController,
  ],


  providers: [

    AuthService,

    JwtStrategy,

    RolesGuard,

  ],


  exports: [

    JwtModule,

    PassportModule,

  ],

})

export class AuthModule {}