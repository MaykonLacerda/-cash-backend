import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from './constants/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
