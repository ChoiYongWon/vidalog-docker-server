import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EmailController } from './email/controllers/email.controller';
import { EmailModule } from './email/email.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UserModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
