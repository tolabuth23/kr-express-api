import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import {Document} from "mongoose";
import {UnitEnum} from "../enum/unit.enum";
import {StatusEnum} from "../enum/status.enum";

export class ImportRateValue {
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
    enum: UnitEnum,
  })
  type: string
  @ApiProperty({})
  @Prop({
    type: String,
    enum: StatusEnum,
    default: StatusEnum.ACTIVE,
  })
  status: string
}



export const importRateValueSchema =
  SchemaFactory.createForClass(ImportRateValue)
