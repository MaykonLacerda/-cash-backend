import { JwtAuthGuard } from 'src/shared/auth/jwt-auth.guard';

import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common';
import { Account } from '@prisma/client';

import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':userId')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async getByUserId(
    @Param('userId')
    userId: string,
  ): Promise<Account> {
    return this.accountService.getAccountByUserId(userId);
  }
}
