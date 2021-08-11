import { HttpException, HttpStatus } from '@nestjs/common';

export class NeedClientInfoException extends HttpException {
  constructor() {
    super({
      status : HttpStatus.UNAUTHORIZED,
      error : "ClientInfo is Needed"
    }, HttpStatus.UNAUTHORIZED);
  }
}