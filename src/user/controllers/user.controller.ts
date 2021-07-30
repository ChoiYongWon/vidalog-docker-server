import { Body, Controller, Delete, Logger, Post, Request } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { DeleteResult } from 'typeorm';

@Controller('user')
export class UserController {

  private readonly logger = new Logger(UserController.name)

  constructor(private userService : UserService,

  ) {}

  @Delete("delete")
  async deleteUser(@Request() req):Promise<DeleteResult>{
    this.logger.log("delete 요청 id : "+req.user.id)
    return await this.userService.delete(req.user.id)
  }

}
