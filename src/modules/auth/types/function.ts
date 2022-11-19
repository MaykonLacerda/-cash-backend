import { LoginDTO, LoginResponse } from './dtos/login.dto';

export type IAuthService = {
  login: (data: LoginDTO) => Promise<LoginResponse>;
};
