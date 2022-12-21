import { ApiProperty } from '@nestjs/swagger'
import { deliveryStatus } from '../enums/deliveryStatus.enum'
import { country } from '../enums/country.enum'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, Types, Document } from 'mongoose'
import { nanoid } from 'nanoid'
import { ImportRateValue } from '../importRate/schemas/importRateValue.schema'
import { Address, User } from '../users/users.schema'
import * as shortid from 'shortid'
import { Currencies } from '../currencies/currencies.schema'
@Schema({
  collection: 'goods',
  timestamps: true,
  versionKey: false,
})
export class Goods {
  @ApiProperty({})
  @Prop({
    type: String,
    required: true,
    index: true,
    unique: true,
    default: shortid.generate(),
  })
  objectId: string
  @ApiProperty({})
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: User.name,
    index: true,
    default: null,
  })
  user: Types.ObjectId
  @ApiProperty({})
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'ship-periods',
    index: true,
    default: null,
  })
  shipPeriod: Types.ObjectId
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
    type: SchemaTypes.ObjectId,
    ref: 'categories',
    index: true,
    default: null,
  })
  category: Types.ObjectId
  @ApiProperty({})
  @Prop({
    enum: deliveryStatus,
    default: deliveryStatus.CREATED,
  })
  status: string
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
    type: ImportRateValue,
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
    eum: [null, country.JP],
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
    enum: [null, country.TH],
    default: null,
  })
  destination?: string
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
    type: SchemaTypes.Mixed,
    default: {},
  })
  meta: any
  @ApiProperty({})
  @Prop({
    type: Address,
    default: null,
  })
  deliveryAddress: Address
  @ApiProperty({})
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'delivery-provider',
    index: true,
    default: null,
  })
  trackingProvider: Types.ObjectId
  @ApiProperty({})
  @Prop({
    type: String,
    default: null,
  })
  destinationTrackingNumber: string
  @ApiProperty({})
  @Prop({
    type: Number,
    default: null,
  })
  deliveryCost: number
}
export type goodsDocument = Goods & Document
export const goodsSchema = SchemaFactory.createForClass(Goods)
