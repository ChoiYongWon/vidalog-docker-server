import { IsArray, IsString } from 'class-validator';

export class GetPostResponseDto {
  @IsArray()
  imageUrls : string[]

  @IsString()
  content : string

  @IsString()
  date: string
}