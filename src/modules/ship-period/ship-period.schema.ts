import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { ShipPeriodStatusEnums } from '../enums/shipPeriodStatus.enums'
import {nanoid} from "nanoid";
import {Document} from "mongoose";
import {ImportRate} from "../importRate/schemas/importRate.schema";

export type shipPeriodDocument = ShipPeriod & Document
@Schema({
  collection: 'ship-periods',
  timestamps: true,
  versionKey: false,
})
export class ShipPeriod {
  @Prop({
    type: String,
    required: true,
    unique: true,
    index: true,
    default: nanoid,
  })
  objectId: string

  @Prop({
    type: Date,
    index: true,
    required: true,
  })
  endAt: Date

  @Prop({
    type: String,
    enum: ShipPeriodStatusEnums,
    default: ShipPeriodStatusEnums.IN_DESTINATION,
  })
  status: string

  @ApiProperty({})
  @Prop({
    type: Number,
    required: true,
    unique: true,
    index: true,
  })
  runningNumber: number
}

export const shipPeriodSchema = SchemaFactory.createForClass(ShipPeriod)
