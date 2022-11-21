import { Prisma, Account } from '@prisma/client';

export type IAccountRepository = {
  create: (data: Prisma.AccountCreateInput) => Promise<Account>;
  findOne: (where: Prisma.AccountWhereUniqueInput) => Promise<Account>;
  update: (data: Prisma.AccountUpdateArgs) => Promise<Account>;
};

export type IAccountService = {
  debitBalance: (userId: string, debitedBalance: number) => Promise<Account>;
  creditBalance: (userId: string, creditedBalance: number) => Promise<Account>;
  updateBalance: (userId: string, newBalance: number) => Promise<Account>;
  getAccountByUserId: (userId: string) => Promise<Account>;
};
