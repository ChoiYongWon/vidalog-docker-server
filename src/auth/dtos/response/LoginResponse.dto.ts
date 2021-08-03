import { IsString } from 'class-validator';

export class LoginResponseDto {

  @IsString()
  access_token : string;

  @IsString()
  refresh_token : string;
}