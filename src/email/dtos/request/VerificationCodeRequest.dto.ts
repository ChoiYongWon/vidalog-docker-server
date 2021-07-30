import { IsString } from 'class-validator';

export class VerificationCodeRequestDto {
  @IsString()
  email : string;
}