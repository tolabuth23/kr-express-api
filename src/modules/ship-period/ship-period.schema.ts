import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { ShipPeriodStatusEnums } from '../enums/shipPeriodStatus.enums'
import {nanoid} from "nanoid";

@Schema()
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

export const ShipPeriodSchema = SchemaFactory.createForClass(ShipPeriod)
