import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { Public } from '../../lib/decorators/public';
import { EmailService } from '../services/email.service';
import { EmailValidResponseDto } from '../dtos/response/EmailValidResponse.dto';
import { EmailAlreadyRegisterException } from '../exceptions/EmailAlreadyRegister.exception';
import { EmailDidNotSendException } from '../exceptions/EmailDidNotSend.exception';
import { VerificationCodeRequestDto } from '../dtos/request/VerificationCodeRequest.dto';
import { VerifyCodeRequestDto } from '../dtos/request/VerifyCodeRequest.dto';
import { VerifyCodeResponseDto } from '../dtos/response/VerifyCodeResponse.dto';

@Controller('email')
export class EmailController {
  private readonly logger = new Logger(EmailController.name)

  constructor(
    private emailService: EmailService,

  ) {
  }

  @Public()
  @Post("verificationCode")
  async getVerificationCode(@Body() emailInfo: VerificationCodeRequestDto): Promise<EmailAlreadyRegisterException | EmailDidNotSendException> {
    this.logger.log("getVerificationCode 요청 email : "+emailInfo.email)
    const isValid = await this.emailService.isEmailValid(emailInfo.email)
    if (isValid.isValid === true) {
      const vCode = await this.emailService.getVerificationCode(emailInfo.email)
      if(await this.emailService.sendMail(emailInfo.email, vCode.verificationCode))
        return
      throw new EmailDidNotSendException()
    }
    throw new EmailAlreadyRegisterException()
  }

  @Public()
  @Post("verifyCode")
  async verifyCode(@Body() body: VerifyCodeRequestDto): Promise<VerifyCodeResponseDto>{
    this.logger.log("verifyCode 요청 email : "+body.email)
    return await this.emailService.verifyCode(body.email, body.verificationCode)
  }

  @Public()
  @Get("emailValid")
  async isEmailValid(@Query("email") email): Promise<EmailValidResponseDto>{
    this.logger.log("emailValid 요청 email : "+email)
    return await this.emailService.isEmailValid(email)
  }
}
