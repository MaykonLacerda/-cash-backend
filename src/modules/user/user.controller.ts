import { JwtAuthGuard } from 'src/shared/auth/jwt-auth.guard';

import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { RegisterDTO } from './types/dtos/register.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(200)
  async create(@Body() data: RegisterDTO): Promise<User> {
    return this.userService.register(data);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async meInfo(
    @Headers('Authorization')
    token: string,
  ): Promise<User> {
    return this.userService.getMeInfo(token);
  }
}
