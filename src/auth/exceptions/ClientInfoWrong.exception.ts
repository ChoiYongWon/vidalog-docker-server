import { HttpException, HttpStatus } from '@nestjs/common';

export class ClientInfoWrongException extends HttpException {
  constructor() {
    super({
      status : HttpStatus.UNAUTHORIZED,
      error : "ClientInfo is Incorrect"
    }, HttpStatus.UNAUTHORIZED);
  }
}