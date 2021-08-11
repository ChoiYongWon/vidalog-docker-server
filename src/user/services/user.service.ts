import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../repositories/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterRequestDto } from '../../auth/dtos/request/RegisterRequest.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService

) {
  }

  async create(user: RegisterRequestDto){
    return await this.userRepository.save(user)
  }

  async delete(userId: string){
    return await this.userRepository.delete(userId)
  }

  async findOne(userId : string) {
    const result = await this.userRepository.findOne(userId)
    return result
  }

  async findByEmail(email: string){
    const result = await this.userRepository.findOne({email : email})
    return result
  }

  async saveRefreshToken(userId: string, refreshToken: string){
    const user = await this.userRepository.findOne(userId)
    let refreshTokens = [...user.refreshToken]
    refreshTokens = refreshTokens.filter((token)=>(this.jwtService.decode(token)["exp"] - (new Date().getTime()/1000)) > 0)
    refreshTokens = [...refreshTokens, refreshToken]
    return await this.userRepository.save({
      ...user,
      refreshToken: [...refreshTokens]
    })
  }

  async expireRefreshToken(userId: string, refreshToken: string){
    const user = await this.userRepository.findOne(userId)
    if(!user) return
    return await this.userRepository.save({
      ...user,
      refreshToken: user.refreshToken.filter((token)=>token!==refreshToken)
    })
  }


  async isUserExist(id: string):Promise<boolean>{
    const userCount = await this.userRepository.count({
      id : id
    })
    return (userCount==0) ? false : true;
  }

}
