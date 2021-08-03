import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../dtos/request/LoginUser.dto';
import * as bcrypt from "bcrypt"
import { RegisterRequestDto } from '../dtos/request/RegisterRequest.dto';
import { Role } from '../../user/enum/Role.enum';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async isValidId(id : string): Promise<boolean> {
    return !(await this.userService.isUserExist(id))
  }

  async registerUser(user : RegisterRequestDto){
    //TODO 검증
    const userInfo = { ...user , role: Role.USER}
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

  async login(user: LoginUserDto):Promise<{access_token : string}>{
    const { password, id, ...rest } = await this.userService.findOne(user.id)
    const payload = {
      id : user.id,
      ...rest
    }

    return {
      access_token : this.jwtService.sign(payload),
    }
  }
}
