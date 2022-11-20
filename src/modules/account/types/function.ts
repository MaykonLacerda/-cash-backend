import { Prisma, Account } from '@prisma/client';

export type IAccountRepository = {
  create: (data: Prisma.AccountCreateInput) => Promise<Account>;
  findOne: (where: Prisma.AccountWhereUniqueInput) => Promise<Account>;
  update: (data: Prisma.AccountUpdateArgs) => Promise<Account>;
};

export type IAccountService = {
  debitBalance: (userId: string, debitedBalance: number) => Promise<Account>;
};
