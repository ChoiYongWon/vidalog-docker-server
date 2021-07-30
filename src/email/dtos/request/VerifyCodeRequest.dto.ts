import { IsString } from 'class-validator';

export class VerifyCodeRequestDto {
  @IsString()
  email : string;

  @IsString()
  verificationCode : string;
}