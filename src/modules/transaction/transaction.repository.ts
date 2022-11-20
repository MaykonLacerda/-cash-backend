import { prisma } from 'src/shared/infra/prisma';

import { BadRequestException } from '@nestjs/common';
import { Prisma, PrismaPromise, Transaction } from '@prisma/client';

import { ITransactionRepository } from './types/function';

export class TransactionRepository implements ITransactionRepository {
  async create(data: Prisma.TransactionCreateInput): Promise<Transaction> {
    try {
      return prisma.transaction.create({ data });
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Could not complete the transaction');
    }
  }

  async findMany(where: Prisma.TransactionWhereInput) {
    try {
      return prisma.transaction.findMany({
        where,
        select: {
          id: true,
          value: true,
          createdAt: true,
          debited: {
            select: {
              user: {
                select: {
                  username: true,
                  id: true,
                },
              },
            },
          },
          credited: {
            select: {
              user: {
                select: {
                  username: true,
                  id: true,
                },
              },
            },
          },
          creditedAccountId: false,
          debitedAccountId: false,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException(
        'Could not find the transactions with these credentials',
      );
    }
  }
}
