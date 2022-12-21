import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNumber, IsObject, IsPositive, IsString, Min } from 'class-validator'
import { DeliveryAddressDTO } from './deliveryAddress.dto'

export class InDestinationGoodsDTO {
  @IsDefined()
  @ApiProperty({})
  trackingNumber: string

  @IsDefined()
  @ApiProperty({})
  userId: string

  @ApiProperty({})
  @IsDefined()
  @IsNumber()
  @IsPositive()
  weight: number

  @ApiProperty({})
  @IsString()
  @IsDefined()
  category: string

  @ApiProperty({})
  @IsString()
  @IsDefined()
  currencyUnit: string

  @ApiProperty({})
  @IsNumber()
  cod: number

  @ApiProperty({})
  @Min(1)
  rate: number

  @ApiProperty({})
  @IsObject()
  deliveryAddress: DeliveryAddressDTO
}
