import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailDidNotSendException extends HttpException {
  constructor() {
    super({
      status : HttpStatus.INTERNAL_SERVER_ERROR,
      error : "EmailDidNotSend"
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}