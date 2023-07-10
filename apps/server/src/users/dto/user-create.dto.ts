import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UserCreateDto {
  @IsString()
  @IsNotEmpty({ message: 'Invlaid User ID' })
  readonly username: string;

  @IsString()
  @IsNotEmpty({ message: 'Invlaid User Name' })
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly familyname: string;

  @IsOptional()
  @IsString()
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: 'Invlaid Password' })
  readonly password: string;
}
