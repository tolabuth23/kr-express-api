import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { RequestService } from './request.service'
import { RequestOtpSignupDto } from './dto/request-otp-signup.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { ValidationRequestOtpSignUpPipe } from './pipes/validate-request-otp-signup'
import { ValidationResetPasswordPipe } from './pipes/validate-reset-password.pipe'
import { ValidationRequestOtpForgotPasswordPipe } from './pipes/validate-request-otp-forgot-password.pipe'
import { RequestOtpForgotPasswordDto } from './dto/request-otp-forgot-password.dto'
import { VerifyDto } from './dto/verify.dto'
import { ValidationVerifyPipe } from './pipes/validator-verify.pipes'

@ApiTags('Request Model')
@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}
  @Post('/otp/sign-up')
  async requestOTPSignUp(@Body() body: RequestOtpSignupDto) {
    return this.requestService.requestOTPSignUp(body)
  }
  @Post('/otp/forgot-password')
  async requestOTPForgotPassword(
    @Body(ValidationRequestOtpForgotPasswordPipe)
    body: RequestOtpForgotPasswordDto,
  ) {
    return this.requestService.requestOTPForgotPassword(body)
  }

  @Post('/otp/reset-password')
  async requestOTPResetPassword(
    @Body(ValidationRequestOtpForgotPasswordPipe)
    body: RequestOtpForgotPasswordDto,
  ) {
    return this.requestService.requestOTPForgotPassword(body)
  }

  @Put('/otp/verify')
  async requestOTPVerify(@Body(ValidationVerifyPipe) body: VerifyDto) {
    return this.requestService.verifyOTP(body)
  }

  @Post('/reset-password')
  async requestResetPassword(
    @Body(ValidationResetPasswordPipe) body: ResetPasswordDto,
  ) {
    return this.requestService.resetPassword(body)
  }
  @Get('/otp/:ref')
  async requestOtpByRef(@Param('ref') ref: string) {
    return this.requestService.getOTP(ref)
  }
}
