import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { Address, Provider } from '../../users/users.schema'

export class UpdateUserDto {
  @ApiProperty({
    example: '0923434344',
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string

  @ApiProperty({
    example: 'Test',
  })
  @IsNotEmpty()
  @IsString()
  displayName: string

  @ApiProperty({
    example: 'test@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({
    example: [
      {
        name: 'test',
        phone: '0931516482',
        province: 'Ubon Ratchathani',
        subDistrict: 'Amphoe Mueang',
        district: 'Nai Mueang',
        postCode: '43000',
        description: 'Student',
        location: 'URBU',
        isDefault: false,
      },
    ],
  })
  addresses: Address

  @ApiProperty({
    example: { line: { id: 'facebook' } },
  })
  @IsNotEmpty()
  provider: Provider
}
