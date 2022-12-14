import { ApiProperty } from '@nestjs/swagger'
import { OtpEnum } from '../../enums/otp.enum'

export class DeleteByPhoneNumberDto {
  @ApiProperty({
    example: '09223434',
  })
  phoneNumber: string
  @ApiProperty({
    example: [OtpEnum.SIGN_UP],
  })
  type: string
  @ApiProperty({
    example: '4300',
  })
  code: string
}
