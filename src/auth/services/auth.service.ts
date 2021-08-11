import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../dtos/request/LoginUser.dto';
import * as bcrypt from "bcrypt"
import { RegisterRequestDto } from '../dtos/request/RegisterRequest.dto';
import { accessTokenConfig, clientInfo, refreshTokenConfig } from '../constants/jwt';
import { RefreshTokenExpiredException } from '../exceptions/RefreshTokenExpired.exception';
import { RefreshTokenResponseDto } from '../dtos/response/RefreshTokenResponse.dto';
import { LoginResponseDto } from '../dtos/response/LoginResponse.dto';
import { ClientInfoWrongException } from '../exceptions/ClientInfoWrong.exception';
import { AccessTokenExpiredException } from '../exceptions/AccessTokenExpired.exception';
import { TokenValidationResponseDto } from '../dtos/response/TokenValidationResponse.dto';
import { NeedClientInfoException } from '../exceptions/NeedClientInfo.exception';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async isValidId(id : string): Promise<boolean> {
    return !(await this.userService.isUserExist(id))
  }

  async isTokenValid(accessToken: string): Promise<TokenValidationResponseDto>{
    try{
      this.jwtService.verify(accessToken, {
        secret : accessTokenConfig.secret
      })
      return {
        valid: true
      }
    }catch(e){
      console.log(e)
      throw new AccessTokenExpiredException()
    }
  }

  async registerUser(user : RegisterRequestDto){
    //TODO 검증
    const userInfo = { ...user}
    userInfo.password = await bcrypt.hash(user.password, 10)
    return await this.userService.create(userInfo)
  }

  //유저 정보가 유효한지 확인
  async validateUser(user: LoginUserDto) {
    const userInfo = await this.userService.findOne(user.id)
    if(userInfo && await bcrypt.compare(user.password, userInfo.password)){
      const {password, ...result} = user
      return result
    }else{
      return null
    }
  }

  async login(user: LoginUserDto):Promise<LoginResponseDto>{

    return {
      ... await this.assignAccessToken(user.id),
      ... await this.assignRefreshToken(user.id)
    }
  }

    async logout(userId: string, refreshToken: string){
      await this.userService.expireRefreshToken(userId, refreshToken)
      return
  }

  async assignAccessToken(userId: string):Promise<{access_token: string}>{
    const { password, refreshToken,  ...rest } = await this.userService.findOne(userId)
    const access_payload = {
      ...rest
    }
    return {
      access_token : this.jwtService.sign(access_payload, {
        secret: accessTokenConfig.secret
      })
    }
  }

  async assignRefreshToken(userId: string):Promise<{refresh_token: string}>{

    const newRefreshToken = this.jwtService.sign({ id: userId }, {
      secret: refreshTokenConfig.secret,
      expiresIn: refreshTokenConfig.expiresIn
    })
    await this.userService.saveRefreshToken(userId, newRefreshToken)

    return { refresh_token : newRefreshToken }
  }


  async refreshAccessToken(authorization: string, refreshToken: string):Promise<RefreshTokenResponseDto>{
    if(!authorization) throw new NeedClientInfoException()

    const authInfo = Buffer.from(authorization.split(" ")[1], "base64").toString("utf8").split(":") //base64로 디코딩
    const id = authInfo[0]
    const secret = authInfo[1]
    //Authorization client id, secret 검사
    if(id !== clientInfo.id || secret !== clientInfo.secret)
      throw new ClientInfoWrongException()

    try {
      //RefreshToken이 유효한지 검사
      const payload = this.jwtService.verify(refreshToken, {
        secret: refreshTokenConfig.secret
      })

      const user = await this.userService.findOne(payload["id"])
      if(!user.refreshToken.includes(refreshToken))
        throw new RefreshTokenExpiredException()


      if ((payload["exp"] - (new Date().getTime() / 1000)) <= (60 * 60 * 24)) {
        //만료 시키고 재발급
        await this.userService.expireRefreshToken(user.id, refreshToken)
        return {
          ...await this.assignAccessToken(payload["id"]),
          ...await this.assignRefreshToken(payload["id"])
        }

      }

      return {
        ...await this.assignAccessToken(payload["id"]),
        refresh_token : refreshToken
      }

    }catch(e){
      throw new RefreshTokenExpiredException()
    }
  }
}
