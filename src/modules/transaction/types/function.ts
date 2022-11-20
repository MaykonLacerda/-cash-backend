import { Prisma, Transaction } from '@prisma/client';

import {
  SendTransactionDTO,
  GetTransactionsDTO,
  GetTransactionsResponse,
} from './dtos/transaction';

export type ITransactionService = {
  sendTransaction: (
    data: SendTransactionDTO,
    token: string,
  ) => Promise<Transaction>;
  getTransactions: (
    data: GetTransactionsDTO,
    token: string,
  ) => Promise<Transaction[]>;
};

export type ITransactionRepository = {
  create: (data: Prisma.TransactionCreateInput) => Promise<Transaction>;
  findMany: (
    where: Prisma.TransactionWhereInput,
  ) => Promise<GetTransactionsResponse[]>;
};
