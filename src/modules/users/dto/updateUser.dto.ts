import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { Address, Provider } from '../users.schema'
import { USER, USER_LEVEL } from '../../../constants'
import { Types } from 'mongoose'

export class UpdateUserDto {
  @ApiProperty({
    example: 'KR-00000003',
  })
  objectId: string
  // fullName
  @ApiProperty({
    example: '0930343223',
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string

  @ApiProperty({
    example: 'tolabuth',
  })
  @IsNotEmpty()
  @IsString()
  displayName: string

  @ApiProperty({
    example: 'tolabuth@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string

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
  @IsArray()
  addresses: Address
  @ApiProperty({
    example: USER,
  })
  level: string

  @ApiProperty({})
  primaryGoodsType?: Types.ObjectId
  @ApiProperty({
    example: { line: { id: 'facebook' } },
  })
  @IsNotEmpty()
  provider: Provider
}
