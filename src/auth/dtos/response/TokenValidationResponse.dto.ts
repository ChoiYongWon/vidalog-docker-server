import { IsBoolean } from 'class-validator';

export class TokenValidationResponseDto {
  @IsBoolean()
  valid : boolean;
}