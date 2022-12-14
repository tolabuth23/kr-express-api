import shortid from 'shortid'
import { ApiProperty } from '@nestjs/swagger'
import { deliveryStatus } from '../enums/deliveryStatus.enum'
import { country } from '../enums/country.enum'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { importRateValue } from '../import-rate-value/import-rate-value.schema'

const modelName = 'goods'
const options = {
  collection: modelName,
  timestamps: true,
  versionKey: false,
}
@Schema(options)
export class goods {
  @ApiProperty({})
  @Prop({
    type: String,
    required: true,
    index: true,
    unique: true,
    default: shortid.generator,
  })
  objectId: string
  @ApiProperty({})
  @Prop({
    type: Schema.prototype.type.objectId,
    ref: 'users',
    index: true,
    default: null,
  })
  user: mongoose.Schema.Types.ObjectId
  @ApiProperty({})
  @Prop({
    type: Schema.prototype.type.objectId,
    ref: 'ship-periods',
    index: true,
    default: null,
  })
  shipPeriod: mongoose.Schema.Types.ObjectId
  @ApiProperty({})
  @Prop({
    type: String,
    index: true,
    default: null,
  })
  trackingNumber: string
  @ApiProperty({})
  @Prop({
    type: String,
    required: true,
  })
  qr: string
  @ApiProperty({})
  @Prop({
    type: Schema.prototype.type.objectId,
    ref: 'categories',
    index: true,
    default: null,
  })
  category: mongoose.Schema.Types.ObjectId
  @ApiProperty({})
  @Prop({
    type: String,
    enum: deliveryStatus,
    default: deliveryStatus[0],
  })
  status: mongoose.Schema.Types.ObjectId
  @ApiProperty({})
  @Prop({
    type: Number,
    default: null,
  })
  weight: number
  @ApiProperty({})
  @Prop({
    type: Number,
    default: 0,
  })
  cod: number
  @ApiProperty({})
  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  rate: number
  @ApiProperty({})
  @Prop({
    type: Object,
    default: null,
  })
  currency: object
  @ApiProperty({})
  @Prop({
    type: importRateValue,
    default: null,
  })
  importRate: object
  @ApiProperty({})
  @Prop({
    type: Number,
    default: 0,
  })
  total: number
  @ApiProperty({})
  @Prop({
    type: String,
    eum: country,
    default: null,
  })
  origin: string
  @ApiProperty({})
  @Prop({
    type: Date,
    default: null,
  })
  originArrivedAt: Date
  @ApiProperty({})
  @Prop({
    type: String,
    enum: country,
    default: null,
  })
  destination: string
  @ApiProperty({})
  @Prop({
    type: Date,
    default: null,
  })
  destinationArrivedAt: Date
  @ApiProperty({})
  @Prop({
    type: Date,
    default: null,
  })
  deliveredAt: Date
  @ApiProperty({})
  @Prop({
    type: Date,
    default: null,
  })
  weighedAt: Date
  @ApiProperty({})
  @Prop({
    type: Schema.prototype.type.Mixed,
    default: {},
  })
  meta: mongoose.Schema.Types.Mixed
  // @ApiProperty({})
  // @Prop({
  //   type: Address,
  //   default: null,
  // })
  // deliveryAddress: Address;
  // @ApiProperty({})
  @Prop({
    type: Schema.prototype.type.ObjectId,
    ref: 'delivery-provider',
    index: true,
    default: null,
  })
  trackingProvider: mongoose.Schema.Types.ObjectId
  @ApiProperty({})
  @Prop({
    type: String,
    default: null,
  })
  destinationTrackingNumber: string
  @ApiProperty({})
  @Prop({
    type: String,
    default: null,
  })
  deliveryCost: string
}

export const goodsSchema = SchemaFactory.createForClass(goods)

goodsSchema.statics.countGoodsReceivedByShipPeriod = async function (
  shipPeriod,
) {
  return this.count({ shipPeriod }).lean()
}
