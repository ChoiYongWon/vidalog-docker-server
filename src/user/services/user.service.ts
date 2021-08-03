import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../repositories/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/service/createUser.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
  }

  async create(user: CreateUserDto){
    return await this.userRepository.save(user)
  }

  async delete(userId: string){
    return await this.userRepository.delete(userId)
  }

  async findOne(id : string) {
    const result = await this.userRepository.findOne(id)
    return result
  }

  async findByEmail(email: string){
    const result = await this.userRepository.findOne({email : email})
    return result
  }

  async isUserExist(id: string):Promise<boolean>{
    const userCount = await this.userRepository.count({
      id : id
    })
    return (userCount==0) ? false : true;
  }

}
