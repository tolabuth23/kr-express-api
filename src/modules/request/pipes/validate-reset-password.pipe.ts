import {
  BadRequestException,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
import { isPast } from 'date-fns'
import { OneTimePasswordService } from '../../one-time-password/one-time-password.service'
import { ResetPasswordDto } from '../dto/reset-password.dto'
import { SignupTypeEnum } from '../enum/signup-type-enum'
@Injectable()
export class ValidationResetPasswordPipe implements PipeTransform {
  @Inject() private readonly otpService: OneTimePasswordService

  async transform(body: ResetPasswordDto): Promise<ResetPasswordDto> {
    const oneTimePassword = await this.otpService.getByRef(body.ref)
    if (!oneTimePassword) {
      throw new BadRequestException('data not found')
    }
    if (oneTimePassword.type !== SignupTypeEnum.FORGOT_PASSWORD) {
      throw new BadRequestException('data is invalid type')
    }
    if (!oneTimePassword.isVerified) {
      throw new BadRequestException("data  isn't verify")
    }
    if (isPast(oneTimePassword.expiredAt)) {
      throw new BadRequestException('otp is expired')
    }
    const newBody = {
      ...body,
      phoneNumber: oneTimePassword.phoneNumber,
    }
    return newBody
  }
}
