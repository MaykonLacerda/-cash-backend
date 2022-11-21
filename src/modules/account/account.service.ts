import { ConflictException, Injectable } from '@nestjs/common';

import { AccountRepository } from './account.repository';
import { IAccountService } from './types/function';

@Injectable()
export class AccountService implements IAccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async updateBalance(userId: string, newBalance: number) {
    return this.accountRepository.update({
      data: {
        balance: newBalance,
      },
      where: {
        userId,
      },
    });
  }

  async debitBalance(userId: string, debitedBalance: number) {
    const account = await this.getAccountByUserId(userId);
    const currentBalance = Number(account.balance);

    if (currentBalance < debitedBalance) {
      throw new ConflictException(
        'You do not have enough balance to make the debit',
      );
    }

    const newBalance = currentBalance - debitedBalance;

    return this.updateBalance(userId, newBalance);
  }

  async creditBalance(userId: string, creditedBalance: number) {
    const account = await this.getAccountByUserId(userId);
    const currentBalance = Number(account.balance);

    const newBalance = currentBalance + creditedBalance;

    return this.updateBalance(userId, newBalance);
  }

  async getAccountByUserId(userId: string) {
    return this.accountRepository.findOne({ userId });
  }
}
