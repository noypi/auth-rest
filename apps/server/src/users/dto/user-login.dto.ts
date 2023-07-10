import { IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  readonly email: string;

  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}