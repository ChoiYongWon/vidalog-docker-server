import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EmailController } from './email/controllers/email.controller';
import { EmailModule } from './email/email.module';
import { PostModule } from './post/post.module';
import { S3Service } from './s3/services/s3.service';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UserModule, EmailModule, PostModule, S3Module],
  controllers: [AppController],
  providers: [AppService, S3Service],
})
export class AppModule {}
