import { ApiProperty } from '@nestjs/swagger'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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

//swagger, dto,class validator, class tranform , nestjs realworld, docker
