import { Controller, Get, Query } from '@nestjs/common';
import { Public } from '../../lib/decorators/public';
import { EmailService } from '../services/email.service';
import { ValidationCodeResponseDto } from '../dtos/response/ValidationCodeResponse.dto';
import { EmailValidResponseDto } from '../dtos/response/EmailValidResponse.dto';

@Controller('email')
export class EmailController {

  constructor(
    private emailService: EmailService
  ) {
  }

  @Public()
  @Get("validationCode")
  async getValidationCode(@Query("email") email): Promise<ValidationCodeResponseDto>{
    return await this.emailService.getValidationCode(email)
  }

  @Public()
  @Get("emailValid")
  async isEmailValid(@Query("email") email): Promise<EmailValidResponseDto>{
    return await this.emailService.isEmailValid(email)
  }
}
