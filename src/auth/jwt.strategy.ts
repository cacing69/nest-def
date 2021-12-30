import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
// import { FastifyRequest } from 'fastify';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    // super({
    //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //   ignoreExpiration: false,
    //   secretOrKey: process.env.JWT_SECRET,
    // });
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          console.log(request?.cookies?.Authentication);
          return request?.cookies?.Authentication;
        },
      ]),
      ignoreExpiration: true,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  async validate(payload: AuthTokenPayload): Promise<User> {
    console.log('jwt_validate');
    console.log(payload);
    // return { uuid: payload.uuid };
    return this.userService.getByUuid(payload.uuid);
    // return true;
  }
}
