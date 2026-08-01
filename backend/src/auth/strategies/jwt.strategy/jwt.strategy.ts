import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {
  super({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false,
    secretOrKey: process.env.JWT_ACCESS_SECRET || 'access_secret_123456',
    passReqToCallback: true,
  });

  console.log("JWT STRATEGY LOADED");
}

async validate(req: any, payload: any) {
  console.log("========== JWT VALID ==========");
  console.log(payload);

  return {
    userId: payload.sub,
    email: payload.email,
    role: payload.role,
  };
}
}