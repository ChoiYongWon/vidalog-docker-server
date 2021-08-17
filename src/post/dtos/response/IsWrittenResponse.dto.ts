import { IsBoolean } from 'class-validator';

export class IsWrittenResponseDto {
  @IsBoolean()
  written: boolean
}