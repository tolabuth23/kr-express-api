import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as shortid from "shortid";

export type CurrencyDocument = Currency & Document

@Schema({
  collection: "currencies",
  timestamps: true,
  versionKey: false
})
export class Currency {
  @Prop({
    type: String,
    required: true,
    index: true,
    unique: true,
    default: shortid.generate()
  })
  objectId: string;

  @Prop({
    type: String,
    required: true
  })
  title: string;

  @Prop({
    type: String,
    required: true,
    unique: true
  })
  currencyUnit: string;

  @Prop({
    type: Number,
    required: true
  })
  value: number;
}

export const currencySchema = SchemaFactory.createForClass(Currency);