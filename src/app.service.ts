import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '배카라쿠네 당토! 이제집간다';
  }
}
