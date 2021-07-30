import { IsString } from 'class-validator';

export class VerificationCodeResponseDto {
  @IsString()
  verificationCode : string;
}