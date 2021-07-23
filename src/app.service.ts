import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '이제 배카라쿠네 당토';
  }
}
