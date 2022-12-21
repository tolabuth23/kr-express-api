import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UserChangePasswordDto {
  @ApiProperty({
    example: '456453643345643',
  })
  @IsNotEmpty()
  @IsString()
  _id: string

  @ApiProperty({
    example: '11111',
  })
  @IsNotEmpty()
  @IsString()
  oldPassword: string

  @ApiProperty({
    example: '22222',
  })
  @IsNotEmpty()
  @IsString()
  password: string
}
