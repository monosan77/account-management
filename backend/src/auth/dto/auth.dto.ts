import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class AuthSignupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'パスワードは英数字を含み、大文字を1つ以上含める必要があります',
  })
  password: string;
}

export class AuthSigninDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'パスワードは英数字を含み、大文字を1つ以上含める必要があります',
  })
  password: string;
}
