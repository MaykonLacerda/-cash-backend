import { JwtAuthGuard } from 'src/shared/auth/jwt-auth.guard';

import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Transaction } from '@prisma/client';

import { TransactionService } from './transaction.service';
import {
  SendTransactionDTO,
  GetTransactionsDTO,
  GetTransactionsResponse,
  TransactionType,
} from './types/dtos/transaction';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async create(
    @Body()
    data: SendTransactionDTO,
    @Headers('Authorization')
    token: string,
  ): Promise<Transaction> {
    return this.transactionService.sendTransaction(data, token);
  }

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async getMany(
    @Headers('Authorization')
    token: string,
    @Query('createdAt')
    createdAt?: string,
    @Query('type')
    type?: TransactionType,
  ): Promise<GetTransactionsResponse[]> {
    const query: GetTransactionsDTO = {
      createdAt,
      type,
    };

    return this.transactionService.getTransactions(query, token);
  }
}
