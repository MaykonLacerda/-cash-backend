import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  MinLength,
} from 'class-validator';

import { Prisma } from '@prisma/client';

export class SendTransactionDTO {
  @IsNotEmpty()
  @IsEmail()
  @MinLength(3)
  to: string;

  @IsNumber()
  @Min(0.1)
  @IsNotEmpty()
  value: number;
}

export enum TransactionType {
  CashIn = 'cashIn',
  CashOut = 'cashOut',
}

export class GetTransactionsDTO {
  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType;

  @IsDate()
  @IsOptional()
  createdAt?: string;
}

export type GetTransactionsResponse = {
  id: string;
  debited: {
    user: {
      id: string;
      username: string;
    };
  };
  credited: {
    user: {
      id: string;
      username: string;
    };
  };
  value: Prisma.Decimal;
  createdAt: Date;
};
