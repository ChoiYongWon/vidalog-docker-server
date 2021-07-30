import { IsBoolean } from 'class-validator';

export class IdValidationResponseDto {
  @IsBoolean()
  isValid : boolean;
}