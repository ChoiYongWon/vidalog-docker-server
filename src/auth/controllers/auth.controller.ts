import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../../user/dtos/request/createUser.dto';
import { LoginAuthGuard } from '../guards/login-auth.guard';
import { Public } from 'src/lib/decorators/public';
import { LoginUserDto } from '../dtos/request/LoginUser.dto';
import { IdValidationResponseDto } from '../dtos/response/IdValidationResponse.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private authService : AuthService
  ) {
  }

  @Public()
  @Get("idValidation")
  async idValidation(@Query("id") id: string): Promise<IdValidationResponseDto> {
    const result = await this.authService.isValidId(id)
    return (result) ? { isValid : true } : { isValid : false }
  }

  @Public()
  @UseGuards(LoginAuthGuard)
  @Post("login")
  async login(@Request() req){
    return await this.authService.login(req.user)
  }

  @Public()
  @Post("register")
  async register(@Body() user: CreateUserDto): Promise<CreateUserDto>{
    const result = await this.authService.registerUser(user)
    return result
  }
}
