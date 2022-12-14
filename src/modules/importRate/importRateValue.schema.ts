import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'

const modelName = 'import-rates'
const options = {
  collection: modelName,
  timestamps: true,
  versionKey: false,
}
@Schema(options)
export class importRateValue {
  @ApiProperty({})
  @Prop({
    type: Number,
    required: true,
  })
  min: number
  @ApiProperty({})
  @Prop({
    type: Number,
    default: null,
  })
  max: number
  @ApiProperty({})
  @Prop({
    type: Number,
    default: null,
  })
  rate: number
  @ApiProperty({})
  @Prop({
    type: String,
    enum: ['kilogram', 'piece'],
  })
  type: string
  @ApiProperty({})
  @Prop({
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  })
  status: string
}

export const deliveryProvidersSchema =
  SchemaFactory.createForClass(importRateValue)
