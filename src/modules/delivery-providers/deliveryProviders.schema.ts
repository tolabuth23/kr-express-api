import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import shortid from 'shortid'

@Schema({
  collection: 'delivery-providers',
  timestamps: true,
  versionKey: false
})
export class DeliveryProviders {
  @Prop({
    type: String,
    required: true,
    index: true,
    unique: true,
    default: shortid.generate()
  })
  objectId: string
  @Prop({
    type: String,
    required: true
  })
  title: string
  @Prop({
    type: Boolean,
    default: true
  })
  requiredTrackingId: string
}

export const deliveryProvidersSchema =
  SchemaFactory.createForClass(DeliveryProviders)
