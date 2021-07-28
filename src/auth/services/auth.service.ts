import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { CreateUserDto } from '../../user/dtos/request/createUser.dto';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService
  ) {}

  async isValidId(id : string): Promise<boolean> {
    return !(await this.userService.isUserExist(id))
  }

  async registerUser(user : CreateUserDto): Promise<CreateUserDto>{
    //TODO 검증
    return this.userService.create(user)
  }
}
