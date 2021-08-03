import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyRegisterException extends HttpException {
  constructor() {
    super({
      status : HttpStatus.NOT_ACCEPTABLE,
      error : "EmailAlreadyRegistered"
    }, HttpStatus.NOT_ACCEPTABLE);
  }
}