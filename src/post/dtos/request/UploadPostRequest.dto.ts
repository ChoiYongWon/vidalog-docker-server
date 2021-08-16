import { IsArray, IsDate, IsString } from 'class-validator';

export class UploadPostRequestDto {
  @IsArray()
  imageFiles : any[]

  @IsString()
  content : string

  @IsDate()
  date: Date

  @IsString()
  location: string

  @IsString()
  userId: string
}