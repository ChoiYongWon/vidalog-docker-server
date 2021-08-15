import { HttpException, HttpStatus } from '@nestjs/common';

export class PostNotFoundException extends HttpException {
  constructor() {
    super({
      status : HttpStatus.NOT_FOUND,
      error : "post not found"
    }, HttpStatus.NOT_FOUND);
  }
}