import { HttpException, HttpStatus } from '@nestjs/common';

export class UploadFailedException extends HttpException {
  constructor() {
    super({
      status : HttpStatus.INTERNAL_SERVER_ERROR,
      error : "Post not uploaded"
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}