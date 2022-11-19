import { prisma } from 'src/shared/infra/prisma';

import { BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { IUserRepository } from './types/function';

export class UserRepository implements IUserRepository {
  async create(data: Prisma.UserCreateInput) {
    try {
      return prisma.user.create({ data });
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Could not register user');
    }
  }

  async findOne(where: Prisma.UserWhereUniqueInput) {
    try {
      return prisma.user.findUnique({ where });
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        'Could not find user with these credentials',
      );
    }
  }
}
