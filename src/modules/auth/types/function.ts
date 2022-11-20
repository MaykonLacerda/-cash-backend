import { User } from '@prisma/client';

import { ITokenPayload } from '.';
import { LoginDTO, LoginResponse } from './dtos/login.dto';

export type IAuthService = {
  login: (data: LoginDTO) => Promise<LoginResponse>;
  validateUser: (data: LoginDTO) => Promise<User | undefined>;
  getTokenPayload: (bearerToken?: string) => Promise<ITokenPayload>;
  getMeInfo: (bearerToken?: string) => Promise<User>;
};
