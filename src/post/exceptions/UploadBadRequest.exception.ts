import { HttpException, HttpStatus } from '@nestjs/common';

export class UploadBadRequestException extends HttpException {
  constructor() {
    super({
      status : HttpStatus.BAD_REQUEST,
      error : "Need Images and Content"
    }, HttpStatus.BAD_REQUEST);
  }
}