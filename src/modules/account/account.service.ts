import { ConflictException, Injectable } from '@nestjs/common';

import { AccountRepository } from './account.repository';
import { IAccountService } from './types/function';

@Injectable()
export class AccountService implements IAccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async debitBalance(userId: string, debitedBalance: number) {
    const account = await this.accountRepository.findOne({ userId });
    const currentBalance = Number(account.balance);

    if (currentBalance < debitedBalance) {
      throw new ConflictException(
        'You do not have enough balance to make the debit',
      );
    }

    const newBalance = currentBalance - debitedBalance;

  async getAccountByUserId(userId: string) {
    return this.accountRepository.findOne({ userId });
  }
}
