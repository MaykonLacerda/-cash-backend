import { Body, Controller, HttpCode, Post } from '@nestjs/common';
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
}
