import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { CreateUserDto } from '../../user/dtos/request/createUser.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../dtos/request/LoginUser.dto';
import * as bcrypt from "bcrypt"
import { clientInfo, refreshTokenConfig } from '../constants/jwt';
import exp from 'constants';
import { RefreshTokenExpiredException } from '../exceptions/RefreshTokenExpired.exception';
import { RefreshTokenResponseDto } from '../dtos/response/RefreshTokenResponse.dto';
import { LoginResponseDto } from '../dtos/response/LoginResponse.dto';
import { ClientInfoWrongException } from '../exceptions/ClientInfoWrong.exception';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async isValidId(id : string): Promise<boolean> {
    return !(await this.userService.isUserExist(id))
  }

  async registerUser(user : CreateUserDto): Promise<CreateUserDto>{
    //TODO 검증
    const userInfo = { ...user }
    userInfo.password = await bcrypt.hash(user.password, 10)
    return this.userService.create(userInfo)
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

  async logout(userId: string){
    await this.userService.expireRefreshToken(userId)
    return
  }

  async assignAccessToken(userId: string):Promise<{access_token: string}>{
    const { password, ...rest } = await this.userService.findOne(userId)
    const access_payload = {
      ...rest
    }
    return {
      access_token : this.jwtService.sign(access_payload)
    }
  }

  async assignRefreshToken(userId: string):Promise<{refresh_token: string}>{
    const refreshToken =  this.jwtService.sign({id: userId}, { secret : refreshTokenConfig.secret, expiresIn : refreshTokenConfig.expiresIn })
    await this.userService.saveRefreshToken(userId, refreshToken)
    return {
      refresh_token: refreshToken
    }
  }

  async refreshAccessToken(authorization: string, refreshToken: string):Promise<RefreshTokenResponseDto>{
    const authInfo = Buffer.from(authorization.split(" ")[1], "base64").toString("utf8").split(":") //base64로 디코딩
    const id = authInfo[0]
    const secret = authInfo[1]
    //Authorization client id, secret 검사
    if(id !== clientInfo.id || secret !== clientInfo.secret)
      throw new ClientInfoWrongException()
    //RefreshToken 존재하는지 검사
    const tokenInfo = await this.userService.findByRefreshToken(refreshToken)
    if(!tokenInfo)
      throw new RefreshTokenExpiredException()

    try{
      //RefreshToken이 유효한지 검사
      const expireInfo = this.jwtService.verify(refreshToken,{
        secret: refreshTokenConfig.secret
      })
      const payload = this.jwtService.decode(refreshToken) //secret 설정안했는데 왜 되지...?

      if((expireInfo.exp - expireInfo.iat) <= 60*60*24)//만료까지 1일 이하로 남았을때
        return {
          ... await this.assignAccessToken(payload["id"]),
          ... await this.assignRefreshToken(payload["id"])
        }

      else
        return {
          ... await this.assignAccessToken(payload["id"]),
          refresh_token: refreshToken
        }
    }catch(e){
      throw new RefreshTokenExpiredException()
    }
  }
}
