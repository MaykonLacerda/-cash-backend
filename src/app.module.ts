import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from './constants/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
  controllers: [],
  providers: [],
})
export class AppModule {}
