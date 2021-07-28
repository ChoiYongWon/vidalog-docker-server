import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../repositories/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/request/createUser.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
  }

  async create(user: CreateUserDto):Promise<CreateUserDto>{
    return await this.userRepository.save(user)
  }

  async isUserExist(id: string):Promise<boolean>{
    const userCount = await this.userRepository.count({
      id : id
    })
    return (userCount==0) ? false : true;
  }

}
