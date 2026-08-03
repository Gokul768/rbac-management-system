import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";

import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "../users/users.service";

import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";

import { RefreshTokenService } from "./refresh-token.service";
@Injectable()
export class AuthService {

  constructor(

    private readonly usersService: UsersService,

    private readonly jwtService: JwtService,

    private readonly refreshTokenService: RefreshTokenService,

  ) {}
  // ================= REGISTER =================

async register(
  registerDto: RegisterDto,
) {

  const {
    name,
    email,
    password,
    role,
  } = registerDto;

  const existingUser =
    await this.usersService.findByEmail(
      email,
    );

  if (existingUser) {
    throw new BadRequestException(
      "Email already exists",
    );
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const user =
    await this.usersService.create({

      name,

      email,

      password: hashedPassword,

      role,

    });

  return {

    message:
      "User registered successfully",

    user: {

      id: user._id,

      name: user.name,

      email: user.email,

      role: user.role,

      status: user.status,

    },

  };

}
// ================= LOGIN =================

async login(
  loginDto: LoginDto,
) {

  const {
    email,
    password,
  } = loginDto;

  const user =
    await this.usersService
      .findByEmailWithPassword(
        email,
      );

  if (!user) {

    throw new UnauthorizedException(
      "Invalid credentials",
    );

  }

  const isPasswordValid =
    await bcrypt.compare(
      password,
      user.password,
    );

  if (!isPasswordValid) {

    throw new UnauthorizedException(
      "Invalid credentials",
    );

  }

  const payload = {

    sub: user._id,

    email: user.email,

    role: user.role,

  };

  const accessToken =
    await this.jwtService.signAsync(
      payload,
      {

        secret:
          process.env.JWT_ACCESS_SECRET ||
          "access_secret_123456",

        expiresIn: 900,

      },
    );

  const refreshToken =
    await this.jwtService.signAsync(
      payload,
      {

        secret:
          process.env.JWT_REFRESH_SECRET ||
          "refresh_secret_123456",

        expiresIn: 604800,

      },
    );

  await this.refreshTokenService.create(

    user._id.toString(),

    refreshToken,

    new Date(
      Date.now() +
      7 * 24 * 60 * 60 * 1000,
    ),

  );

  return {

    message: "Login successful",

    accessToken,

    refreshToken,

    user: {

      id: user._id,

      name: user.name,

      email: user.email,

      role: user.role,

    },

  };

}
// ================= REFRESH TOKEN =================

async refreshToken(
  refreshTokenDto: RefreshTokenDto,
) {

  const { refreshToken } = refreshTokenDto;

  try {

    // Verify Refresh Token
    const payload =
      await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret:
            process.env.JWT_REFRESH_SECRET ||
            "refresh_secret_123456",
        },
      );

    // Check Refresh Token in MongoDB
    const storedToken =
      await this.refreshTokenService.findToken(
        refreshToken,
      );

    if (!storedToken) {

      throw new UnauthorizedException(
        "Refresh Token not found",
      );

    }

    // Check Expiry
    if (
      storedToken.expiresAt <
      new Date()
    ) {

      await this.refreshTokenService.removeToken(
        refreshToken,
      );

      throw new UnauthorizedException(
        "Refresh Token Expired",
      );

    }

    // Generate New Access Token
    const accessToken =
      await this.jwtService.signAsync(
        {
          sub: payload.sub,
          email: payload.email,
          role: payload.role,
        },
        {
          secret:
            process.env.JWT_ACCESS_SECRET ||
            "access_secret_123456",

          expiresIn: 900,
        },
      );

    return {

      message:
        "Access Token Refreshed Successfully",

      accessToken,

    };

  } catch (error) {

    throw new UnauthorizedException(
      "Invalid Refresh Token",
    );

  }

}
// ================= LOGOUT =================

async logout(
  refreshTokenDto: RefreshTokenDto,
) {

  const { refreshToken } = refreshTokenDto;

  const storedToken =
    await this.refreshTokenService.findToken(
      refreshToken,
    );

  if (!storedToken) {

    throw new UnauthorizedException(
      "Invalid Refresh Token",
    );

  }

  await this.refreshTokenService.removeToken(
    refreshToken,
  );

  return {

    message: "Logged out successfully",

  };

}
}
