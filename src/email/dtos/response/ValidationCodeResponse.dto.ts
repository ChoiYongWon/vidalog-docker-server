import { IsString } from 'class-validator';

export class ValidationCodeResponseDto {
  @IsString()
  validationCode : string;
}