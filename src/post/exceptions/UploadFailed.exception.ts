import { HttpException, HttpStatus } from '@nestjs/common';

export class UploadFailedException extends HttpException {
  constructor() {
    super({
      status : HttpStatus.BAD_REQUEST,
      error : "Post not uploaded"
    }, HttpStatus.BAD_REQUEST);
  }
}