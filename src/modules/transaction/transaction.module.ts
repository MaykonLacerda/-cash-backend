import { JwtStrategy } from 'src/strategies/jwt.strategy';

import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AccountRepository } from '../account/account.repository';
import { AccountService } from '../account/account.service';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { TransactionController } from './transaction.controller';
import { TransactionRepository } from './transaction.repository';
import { TransactionService } from './transaction.service';

@Module({
  controllers: [TransactionController],
  providers: [
    TransactionService,
    UserRepository,
    UserService,
    TransactionRepository,
    AccountRepository,
    JwtStrategy,
    AuthService,
    AccountService,
    JwtService,
    AccountRepository,
  ],
})
export class TransactionModule {}
