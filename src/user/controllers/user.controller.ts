import { Body, Controller, Delete, Post, Request} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { DeleteResult } from 'typeorm';

@Controller('user')
export class UserController {

  constructor(private userService : UserService) {}

  @Delete("delete")
  async deleteUser(@Request() req):Promise<DeleteResult>{
    return await this.userService.delete(req.user.id)
  }

}
