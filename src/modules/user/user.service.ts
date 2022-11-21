import { hash } from 'bcrypt';

import { ConflictException, Injectable } from '@nestjs/common';

import { AuthService } from '../auth/auth.service';
import { RegisterDTO } from './types/dtos/register.dto';
import { IUserService } from './types/function';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async register(data: RegisterDTO) {
    const userFound = await this.userRepository.findOne({
      username: data.username,
    });

    if (userFound) {
      throw new ConflictException(
        'There is already a user registered with these credentials',
      );
    }

    const initialBalance = 100;
    const passwordHash = await hash(data.password, 8);

    data.password = passwordHash;

    const user = await this.userRepository.create({
      ...data,
      account: {
        create: {
          balance: initialBalance,
        },
      },
    });

    return user;
  }

  async getMeInfo(bearerToken: string) {
    const payload = await this.authService.getTokenPayload(bearerToken);

    return this.userRepository.findOne({ id: payload.id });
  }
}
