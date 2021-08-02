import { IsString } from 'class-validator';

export class RefreshTokenResponseDto {

  @IsString()
  access_token : string;

  @IsString()
  refresh_token : string;
}