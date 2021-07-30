import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Email } from '../repositories/email.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../user/services/user.service';
import { EmailValidResponseDto } from '../dtos/response/EmailValidResponse.dto';
import { VerificationCodeResponseDto } from '../dtos/response/VerificationCodeResponse.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { VerifyCodeResponseDto } from '../dtos/response/VerifyCodeResponse.dto';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email)
    private emailRepository: Repository<Email>,
    private userService: UserService,
    private readonly mailerService: MailerService
  ) {}

  //이메일이 유효한지 검사
  async isEmailValid(email: string):Promise<EmailValidResponseDto>{
    const result = await this.userService.findByEmail(email)
    return {isValid : result ? false : true }
  }

  //인증 코드 발급
  async getVerificationCode(email: string):Promise<VerificationCodeResponseDto>{
    const verificationCode = Math.random().toString(36).substr(2,6).toUpperCase();
    await this.emailRepository.save({email : email, verificationCode : verificationCode})
    return { verificationCode : verificationCode }
  }

  async verifyCode(email: string, code: string):Promise<VerifyCodeResponseDto>{
    const emailInfo = await this.emailRepository.findOne({
      email : email,
      verificationCode : code
    })
    if(emailInfo) return { verified : true}
    return { verified : false }

  }
  async sendMail(email:string, code:string): Promise<boolean>{
    const result = await this.mailerService.sendMail({
      to: email, // list of receivers
      from: 'vidalog@naver.com', // sender address
      subject: '[Vidalog] Verification Code', // Subject line
      text: '', // plaintext body
      html: 'Vidalog 인증 코드 입니다.<br><h2>'+code+'</h2>', // HTML body content
    }).then(()=>true).catch(()=>false)
    return result
  }

}
