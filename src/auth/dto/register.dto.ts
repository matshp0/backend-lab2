import { IsString, IsEmail, Length, IsStrongPassword } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(5, 255)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
