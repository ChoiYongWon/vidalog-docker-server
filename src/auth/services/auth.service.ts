import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { CreateUserDto } from '../../user/dtos/request/createUser.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../dtos/request/LoginUser.dto';

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
    return this.userService.create(user)
  }

  //유저 정보가 유효한지 확인
  async validateUser(user: LoginUserDto) {
    const userInfo = await this.userService.findOne(user.id)
    console.log(user, userInfo)
    if(userInfo && userInfo.password===user.password){
      const {password, ...result} = user
      return result
    }else{
      return null
    }
  }

  async login(user: LoginUserDto):Promise<{access_token : string}>{
    const payload = {
      id : user.id
    }

    return {
      access_token : this.jwtService.sign(payload),
    }
  }
}
