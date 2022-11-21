import { Prisma, User } from '@prisma/client';

import { RegisterDTO } from './dtos/register.dto';

export type IUserRepository = {
  create: (data: RegisterDTO) => Promise<User>;
  findOne: (where: Prisma.UserWhereUniqueInput) => Promise<User>;
};

export type IUserService = {
  register: (data: RegisterDTO) => Promise<User>;
  getMeInfo: (bearerToken?: string) => Promise<User>;
};
