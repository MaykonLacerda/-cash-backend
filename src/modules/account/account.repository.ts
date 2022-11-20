import { prisma } from 'src/shared/infra/prisma';

import { BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { IAccountRepository } from './types/function';

export class AccountRepository implements IAccountRepository {
  async create(data: Prisma.AccountCreateInput) {
    try {
      return prisma.account.create({ data });
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Could not create the account');
    }
  }

  async findOne(where: Prisma.AccountWhereUniqueInput) {
    try {
      return prisma.account.findUnique({ where });
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        'Could not find a account with these credentials',
      );
    }
  }

  async update(data: Prisma.AccountUpdateArgs) {
    try {
      return prisma.account.update(data);
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        'Could not find a account with these credentials',
      );
    }
  }
}
