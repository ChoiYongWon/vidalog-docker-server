import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService
  ) {}

  async isValidId(id : string): Promise<boolean> {
    return await this.userService.isUserExist(id)
  }
}
