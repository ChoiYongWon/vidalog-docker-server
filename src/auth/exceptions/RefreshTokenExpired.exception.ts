import { HttpException, HttpStatus } from '@nestjs/common';

export class RefreshTokenExpiredException extends HttpException {
  constructor() {
    super({
      status : HttpStatus.UNAUTHORIZED,
      error : "RefreshToken Expired"
    }, HttpStatus.UNAUTHORIZED);
  }
}