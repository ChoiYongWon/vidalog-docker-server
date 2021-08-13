import { Module } from '@nestjs/common';
import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';
import { MulterModule } from '@nestjs/platform-express';
import { S3Service } from '../s3/services/s3.service';

@Module({
  imports: [MulterModule.registerAsync({
    useClass: S3Service
  })],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule {}
