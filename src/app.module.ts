import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { PostModule } from './post/post.module';
import { S3Module } from './s3/s3.module';
import { MulterModule } from './multer/multer.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UserModule, EmailModule, PostModule, S3Module, MulterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
