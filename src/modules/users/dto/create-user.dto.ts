import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Address, Provider, Social } from '../users.schema'

export class CreateUserDto {
  // fullName
  @ApiProperty({
    example: 'tola@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  // Email
  @ApiProperty({
    example: 'tolabuth',
  })
  @IsNotEmpty()
  @IsString()
  displayName: string

  // Password
  @ApiProperty({
    example: [
      {
        name: 'tola',
        phone: '0931516482',
        province: 'Ubon',
        subDistrict: 'Moung',
        district: 'Nai Moung',
        postCode: '43000',
        description: 'Student',
        location: 'Ubon Moung',
        isDefault: false,
      },
    ],
  })
  @IsNotEmpty()
  addresses: Address

  @ApiProperty({
    example: '234343553',
  })
  @IsNotEmpty()
  @IsString()
  objectId: string
  @ApiProperty({
    example: '0931516482',
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string

  @ApiProperty({
    example: '1111',
  })
  @IsNotEmpty()
  @IsString()
  password: string

  @ApiProperty({
    example: Date.now(),
  })
  @IsNotEmpty()
  @IsString()
  latestLogin: Date
  @ApiProperty({})
  primaryGoodsType?: string

  @ApiProperty({
    example: { line: { id: 'facebook' } },
  })
  @IsNotEmpty()
  provider: Provider

  @ApiProperty({
    example: false,
  })
  @IsNotEmpty()
  changedPassword: boolean
}
