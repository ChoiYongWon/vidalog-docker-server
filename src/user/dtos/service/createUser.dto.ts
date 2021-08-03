import { IsEnum, IsString } from 'class-validator';
import { Role } from '../../enum/Role.enum';

export class CreateUserDto {
  @IsString()
  id : string;

  @IsString()
  password : string;

  @IsString()
  email : string;

  @IsString()
  nickname : string;

  @IsEnum(Role)
  role : Role
}