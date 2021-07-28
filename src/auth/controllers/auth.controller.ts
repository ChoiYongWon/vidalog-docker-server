import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../../user/dtos/request/createUser.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private authService : AuthService
  ) {
  }

  @Get("idValidation")
  async idValidation(@Query("id") id: string) {
    const result = await this.authService.isValidId(id)
    return (result) ? { isValid : true } : { isValid : false }
  }

  //회원가입 최종 요청시
  @Post("register")
  async register(@Body() user: CreateUserDto): Promise<CreateUserDto>{
    const result = await this.authService.registerUser(user)
    return result
  }
}
