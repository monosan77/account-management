import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(19)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(10, 11)
  tel: string;
}

export class UpdataAccountDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(19)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(10, 11)
  tel: string;
}
