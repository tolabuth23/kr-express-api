import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import shortid from 'shortid'
import { ApiProperty } from '@nestjs/swagger'

const modelName = 'delivery-providers'
const options = {
  collection: modelName,
  timestamps: true,
  versionKey: false,
}
@Schema(options)
export class delivery_providers {
  @ApiProperty({})
  @Prop({
    type: String,
    required: true,
    index: true,
    unique: true,
    default: null,
  })
  objectId: string
  @ApiProperty({})
  @Prop({
    type: String,
    required: true,
  })
  title: string
  @ApiProperty({})
  @Prop({
    type: Boolean,
    default: true,
  })
  requiredTrackingId: string
}

export const deliveryProvidersSchema =
  SchemaFactory.createForClass(delivery_providers)
