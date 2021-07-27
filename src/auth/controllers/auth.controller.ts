import { Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

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

  //TODO 회원가입 최종 요청시
  @Post("register")
  registerUser(): void{
    return
  }
}
