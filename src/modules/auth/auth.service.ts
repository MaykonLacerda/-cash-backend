import { compare } from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import { UserRepository } from '../user/user.repository';
import { LoginDTO } from './types/dtos/login.dto';
import { IAuthService } from './types/function';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser({
    password,
    username,
  }: LoginDTO): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ username });

    if (!user) return;

    const passwordMatch = await compare(password, user?.password);

    if (!passwordMatch) return;

    return user;
  }
}
