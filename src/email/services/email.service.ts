import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Email } from '../repositories/email.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../user/services/user.service';
import { EmailValidResponseDto } from '../dtos/response/EmailValidResponse.dto';
import { ValidationCodeResponseDto } from '../dtos/response/ValidationCodeResponse.dto';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email)
    private emailRepository: Repository<Email>,
    private userService: UserService
  ) {}

  //이메일이 유효한지 검사
  async isEmailValid(email: string):Promise<EmailValidResponseDto>{
    const result = await this.userService.findByEmail(email)
    return {isValid : result ? false : true }
  }

  //인증 코드 발급
  async getValidationCode(email: string):Promise<ValidationCodeResponseDto>{
    const validationCode = Math.random().toString(36).substr(2,6).toUpperCase();
    console.log(validationCode)
    await this.emailRepository.save({email : email, validationCode : validationCode})
    return { validationCode : validationCode }
  }

}
