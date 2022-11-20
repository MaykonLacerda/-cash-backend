import { ExtractJwt, Strategy } from 'passport-jwt';
import config from 'src/constants/config';
import { ITokenPayload } from 'src/modules/auth/types';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config().jwt.secretKey,
    });
  }

  async validate(payload: ITokenPayload): Promise<ITokenPayload> {
    return {
      id: payload.id,
      username: payload.username,
    };
  }
}
