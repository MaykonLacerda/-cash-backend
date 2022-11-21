import { Strategy } from 'passport-local';
import { AuthService } from 'src/modules/auth/auth.service';

import { ConflictException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser({ username, password });

    if (!user) {
      throw new ConflictException(
        'Invalid credentials. Verify again or check if you already have an account on the platform',
      );
    }

    return user;
  }
}
