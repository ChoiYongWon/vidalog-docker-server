import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../repositories/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterRequestDto } from '../../auth/dtos/request/RegisterRequest.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
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
    return await this.userRepository.save({
      ...user,
      refreshToken: refreshToken
    })
  }

  async expireRefreshToken(userId: string){
    const user = await this.userRepository.findOne(userId)
    if(!user) return
    return await this.userRepository.save({
      ...user,
      refreshToken: null
    })
  }

  async findByRefreshToken(refreshToken: string){
    const result = await this.userRepository.findOne({refreshToken : refreshToken})
    return result
  }

  async isUserExist(id: string):Promise<boolean>{
    const userCount = await this.userRepository.count({
      id : id
    })
    return (userCount==0) ? false : true;
  }

}
