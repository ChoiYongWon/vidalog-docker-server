import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { accessTokenConfig } from '../../constants/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: accessTokenConfig.secret,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      email : payload.email,
      nickname : payload.nickname,
      role: payload.role
    };
  }
}