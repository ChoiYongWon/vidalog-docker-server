import { Module } from '@nestjs/common';
import { MulterService } from './services/multer.service';

@Module({
  providers: [MulterService],
  exports: [MulterService]
})
export class MulterModule {}
