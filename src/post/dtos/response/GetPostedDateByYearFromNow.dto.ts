import { IsArray } from 'class-validator';

export class GetPostedDateByYearFromNowDto {

  @IsArray()
  postedDate : string[]

}