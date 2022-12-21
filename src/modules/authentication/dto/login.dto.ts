import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
export class LoginDto {
  @ApiProperty({
    example: '0931516482',
  })
  @IsString()
  phoneNumber: string

  @ApiProperty({
    example: '1111',
  })
  @IsNotEmpty()
  password: string
}
