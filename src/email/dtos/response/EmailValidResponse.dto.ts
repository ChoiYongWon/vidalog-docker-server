import { IsBoolean } from 'class-validator';

export class EmailValidResponseDto {
  @IsBoolean()
  isValid : boolean;
}