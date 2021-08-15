import { Module } from '@nestjs/common';
import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';
import { MulterModule } from '@nestjs/platform-express';
import { MulterService } from '../multer/services/multer.service';
import { S3Module } from '../s3/s3.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './repositories/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), MulterModule.registerAsync({
    useClass: MulterService
  }), S3Module],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule {}
