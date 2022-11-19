import { hash } from 'bcrypt';

import { ConflictException, Injectable } from '@nestjs/common';

import { RegisterDTO } from './types/dtos/register.dto';
import { IUserService } from './types/function';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}

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
}
