import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from './constants/config';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    UserModule,
    AuthModule,
    TransactionModule,
    AccountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
