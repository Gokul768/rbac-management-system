import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log("JWT GUARD CALLED");
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log("ERR:", err);
    console.log("USER:", user);
    console.log("INFO:", info);

    if (err || !user) {
      throw err || new UnauthorizedException(info?.message);
    }

    return user;
  }
}