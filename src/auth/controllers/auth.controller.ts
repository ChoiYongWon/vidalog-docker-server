import { Body, Controller, Get, Headers, Logger, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../../user/dtos/request/createUser.dto';
import { LoginAuthGuard } from '../guards/login-auth.guard';
import { Public } from 'src/lib/decorators/public';
import { LoginUserDto } from '../dtos/request/LoginUser.dto';
import { IdValidationResponseDto } from '../dtos/response/IdValidationResponse.dto';
import { RefreshTokenResponseDto } from '../dtos/response/RefreshTokenResponse.dto';
import { RefreshTokenRequestDto } from '../dtos/request/RefreshTokenRequest.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)

  constructor(
    private authService : AuthService,
  ) {
  }

  @Public()
  @Get("idValidation")
  async idValidation(@Query("id") id: string): Promise<IdValidationResponseDto> {
    this.logger.log("idValidation 요청 id : "+id)
    const result = await this.authService.isValidId(id)
    return (result) ? { isValid : true } : { isValid : false }
  }

  @Public()
  @UseGuards(LoginAuthGuard)
  @Post("login")
  async login(@Request() req){
    this.logger.log("login 요청 id : "+req.user.id)
    return await this.authService.login(req.user)
  }

  @Post("logout")
  async logout(@Request() req){
    this.logger.log("logout 요청 id : "+req.user.id)
    return await this.authService.logout(req.user)
  }

  @Public()
  @Post("register")
  async register(@Body() user: CreateUserDto): Promise<CreateUserDto>{
    this.logger.log("register 요청 id : "+user.id)
    const result = await this.authService.registerUser(user)
    return result
  }

  @Public()
  @Post("refreshToken")
  async getRefreshToken(@Body() body: RefreshTokenRequestDto, @Headers() header): Promise<RefreshTokenResponseDto>{
    this.logger.log("refreshToken 요청")
    return await this.authService.refreshAccessToken(header["authorization"], body.refresh_token)
  }
}
