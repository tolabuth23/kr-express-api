import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNumber, IsPositive, IsString } from 'class-validator'

export class DeliveredGoodsDTO {
  @ApiProperty({})
  @IsDefined()
  @IsString()
  trackingNumber: string

  @ApiProperty({})
  @IsDefined()
  @IsString()
  userId: string

  @ApiProperty({})
  @IsDefined()
  @IsNumber()
  cod: number

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
  @IsString()
  @IsDefined()
  destinationTrackingNumber: string

  @ApiProperty({})
  @IsString()
  @IsDefined()
  trackingProvider: string

  @ApiProperty({})
  @IsDefined()
  @IsNumber()
  deliveryCost: number
}