import { ApiProperty } from '@nestjs/swagger';
import { deliveryStatus } from '../enums/deliveryStatus.enum';
import { country } from '../enums/country.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document } from 'mongoose';
import { importRateValue } from '../importRate/importRateValue.schema';
import {nanoid} from "nanoid";

const modelName = 'goods';
const options = {
  collection: modelName,
  timestamps: true,
  versionKey: false,
};
@Schema(options)
export class goods {
  @ApiProperty({})
  @Prop({
    type: String,
    required: true,
    index: true,
    unique: true,
    default: nanoid(),
  })
  objectId: string;
  @ApiProperty({})
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'users',
    index: true,
    default: null,
  })
  user: Types.ObjectId;
  @ApiProperty({})
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'ship-periods',
    index: true,
    default: null,
  })
  shipPeriod: Types.ObjectId;
  @ApiProperty({})
  @Prop({
    type: String,
    index: true,
    default: null,
  })
  trackingNumber: string;
  @ApiProperty({})
  @Prop({
    type: String,
    required: true,
  })
  qr: string;
  @ApiProperty({})
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'categories',
    index: true,
    default: null,
  })
  category: Types.ObjectId;
  @ApiProperty({})
  @Prop({
    type: String,
    enum: deliveryStatus,
    default: deliveryStatus[0],
  })
  status: Types.ObjectId;
  @ApiProperty({})
  @Prop({
    type: Number,
    default: null,
  })
  weight: number;
  @ApiProperty({})
  @Prop({
    type: Number,
    default: 0,
  })
  cod: number;
  @ApiProperty({})
  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  rate: number;
  @ApiProperty({})
  @Prop({
    type: Object,
    default: null,
  })
  currency: object;
  @ApiProperty({})
  @Prop({
    type: importRateValue,
    default: null,
  })
  importRate: object;
  @ApiProperty({})
  @Prop({
    type: Number,
    default: 0,
  })
  total: number;
  @ApiProperty({})
  @Prop({
    type: String,
    eum: country,
    default: null,
  })
  origin: string;
  @ApiProperty({})
  @Prop({
    type: Date,
    default: null,
  })
  originArrivedAt: Date;
  @ApiProperty({})
  @Prop({
    type: String,
    enum: country,
    default: null,
  })
  destination: string;
  @ApiProperty({})
  @Prop({
    type: Date,
    default: null,
  })
  destinationArrivedAt: Date;
  @ApiProperty({})
  @Prop({
    type: Date,
    default: null,
  })
  deliveredAt: Date;
  @ApiProperty({})
  @Prop({
    type: Date,
    default: null,
  })
  weighedAt: Date;
  @ApiProperty({})
  @Prop({
    type: SchemaTypes.Mixed,
    default: {},
  })
  meta: any;
  // @ApiProperty({})
  // @Prop({
  //   type: Address,
  //   default: null,
  // })
  // deliveryAddress: Address;
  // @ApiProperty({})
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'delivery-provider',
    index: true,
    default: null,
  })
  trackingProvider: Types.ObjectId;
  @ApiProperty({})
  @Prop({
    type: String,
    default: null,
  })
  destinationTrackingNumber: string;
  @ApiProperty({})
  @Prop({
    type: String,
    default: null,
  })
  deliveryCost: string;
}

export const goodsSchema = SchemaFactory.createForClass(goods);

goodsSchema.statics.countGoodsReceivedByShipPeriod = async function (
  shipPeriod,
) {
  return this.count({ shipPeriod }).lean();
};
