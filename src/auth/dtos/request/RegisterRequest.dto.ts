import { IsString } from 'class-validator';

export class RegisterRequestDto {
  @IsString()
  id : string;

  @IsString()
  password : string;

  @IsString()
  email : string;

  @IsString()
  nickname : string;
}