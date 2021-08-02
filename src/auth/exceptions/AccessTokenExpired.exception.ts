import { HttpException, HttpStatus } from '@nestjs/common';

export class AccessTokenExpiredException extends HttpException {
  constructor() {
    super({
      status : HttpStatus.UNAUTHORIZED,
      error : "AccessToken Expired"
    }, HttpStatus.UNAUTHORIZED);
  }
}