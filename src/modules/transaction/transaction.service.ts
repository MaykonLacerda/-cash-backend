import { getBetweenByOneDay } from 'src/utils/date';

import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaPromise, Transaction } from '@prisma/client';

import { AccountRepository } from '../account/account.repository';
import { AccountService } from '../account/account.service';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { TransactionRepository } from './transaction.repository';
import {
  SendTransactionDTO,
  GetTransactionsDTO,
  TransactionType,
} from './types/dtos/transaction';

@Injectable()
export class TransactionService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly transactionRepository: TransactionRepository,
    private readonly authService: AuthService,
    private readonly accountService: AccountService,
    private readonly accountRepository: AccountRepository,
  ) {}

  async sendTransaction(
    data: SendTransactionDTO,
    token: string,
  ): Promise<PrismaPromise<Transaction>> {
    const creditedUser = await this.userRepository.findOne({
      username: data.to,
    });

    if (!creditedUser) {
      throw new ConflictException(
        'Could not to complete transaction for this username',
      );
    }

    const meInfo = await this.userService.getMeInfo(token);

    if (meInfo.id === creditedUser.id) {
      throw new ConflictException('You cannot send a transaction to yourself');
    }

    await Promise.all([
      await this.accountService.debitBalance(meInfo.id, data.value),
      await this.accountService.creditBalance(creditedUser.id, data.value),
    ]);

    const transaction = await this.transactionRepository.create({
      value: data.value,
      credited: {
        connect: {
          userId: creditedUser.id,
        },
      },
      debited: {
        connect: {
          userId: meInfo.id,
        },
      },
    });

    return transaction;
  }

  async getTransactions(filter: GetTransactionsDTO, token: string) {
    const { id } = await this.authService.getTokenPayload(token);

    const account = await this.accountRepository.findOne({
      userId: id,
    });

    const literalTypeFilter = {
      [TransactionType.CashIn]: {
        creditedAccountId: account.id,
      },
      [TransactionType.CashOut]: {
        debitedAccountId: account.id,
      },
    };

    if (filter?.createdAt && !Date.parse(filter?.createdAt)) {
      throw new BadRequestException(
        'Please check if the date value follows the timestamp pattern',
      );
    }

    const between = filter?.createdAt && getBetweenByOneDay(filter?.createdAt);

    const transactions = await this.transactionRepository.findMany({
      ...(!filter.type
        ? {
            OR: Object.values(literalTypeFilter),
          }
        : literalTypeFilter[filter.type]),
      ...(filter.createdAt && {
        createdAt: {
          gte: between?.[0],
          lte: between?.[1],
        },
      }),
    });

    return transactions;
  }
}
