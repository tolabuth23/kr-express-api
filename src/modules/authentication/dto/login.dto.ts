import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class LoginDto {
  @ApiProperty({
    example: 'tola@gmail.com',
  })
  @IsString()
  email: string

  @ApiProperty({
    example: '1111',
  })
  password: string
}
