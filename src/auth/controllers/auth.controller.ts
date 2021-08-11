import { Body, Controller, Get, Headers, Logger, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginAuthGuard } from '../guards/login-auth.guard';
import { Public } from 'src/lib/decorators/public';
import { IdValidationResponseDto } from '../dtos/response/IdValidationResponse.dto';
import { RegisterRequestDto } from '../dtos/request/RegisterRequest.dto';
import { RefreshTokenResponseDto } from '../dtos/response/RefreshTokenResponse.dto';
import { RefreshTokenRequestDto } from '../dtos/request/RefreshTokenRequest.dto';
import { TokenValidationResponseDto } from '../dtos/response/TokenValidationResponse.dto';
import { LogoutRequestDto } from '../dtos/request/LogoutRequest.dto';

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
  async logout(@Request() req, @Body() body:LogoutRequestDto){
    this.logger.log("logout 요청 id : "+req.user.id)
    return await this.authService.logout(req.user.id, body.refreshToken)
  }

  @Public()
  @Post("register")
  async register(@Body() user: RegisterRequestDto){
    //TODO RegisterFailed Exception 만들기
    this.logger.log("register 요청 id : "+user.id)
    await this.authService.registerUser(user)
    return
  }

  @Public()
  @Post("refreshToken")
  async getRefreshToken(@Body() body: RefreshTokenRequestDto, @Headers() header): Promise<RefreshTokenResponseDto>{
    this.logger.log("refreshToken 요청")
    return await this.authService.refreshAccessToken(header["authorization"], body.refresh_token)
  }

  @Get("isATValid")
  async getATValidation(@Headers() header): Promise<TokenValidationResponseDto>{
    this.logger.log("isATValid 요청")
    const token = header["authorization"].split(" ")[1]
    return await this.authService.isTokenValid(token)
  }
}
