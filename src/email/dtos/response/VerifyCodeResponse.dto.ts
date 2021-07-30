import { IsBoolean } from 'class-validator';

export class VerifyCodeResponseDto {
  @IsBoolean()
  verified : boolean;
}