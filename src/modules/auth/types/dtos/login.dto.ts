import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}

export class LoginResponse {
  token: string;
}
