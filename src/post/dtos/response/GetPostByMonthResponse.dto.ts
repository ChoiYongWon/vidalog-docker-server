import { IsString } from 'class-validator';

export class GetPostByMonthResponseDto {

  @IsString()
  imgUrl : string

  @IsString()
  date: string

}