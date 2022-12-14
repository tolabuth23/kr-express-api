import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'


import { ACTIVE, USER, USER_LEVEL, USER_STATUS } from '../../constants'
import * as mongoose from 'mongoose'
import {nanoid} from "nanoid";
import {importRateValue} from "../importRate/importRateValue.schema";

@Schema()
export class Address {
  @Prop({
    type: String,
    required: true,
  })
  name: string

  @Prop({
    type: String,
    required: true,
  })
  phone: string

  @Prop({
    type: String,
    required: true,
  })
  province: string

  @Prop({
    type: String,
    require: true,
  })
  subDistrict: string

  @Prop({
    type: String,
    require: true,
  })
  district: string

  @Prop({
    type: String,
    require: true,
  })
  postCode: string

  @Prop({
    type: String,
    require: true,
  })
  description: string

  @Prop({
    type: String,
    required: true,
  })
  location: string

  @Prop({
    type: Boolean,
    default: false,
  })
  isDefault: boolean
}

export class Socieal {
  @Prop({
    type: String,
  })
  id: string
}

export class Provider {
  @Prop({ type: Socieal })
  line: Socieal
}

export class User {
  @Prop({
    type: String,
  })
  email: string

  @Prop({
    type: String,
    required: true,
  })
  displayName: string

  @Prop({
    type: [Address],
    required: true,
  })
  address: Address

  @Prop({
    type: String,
    required: true,
    unique: true,
    index: true,
    default: nanoid,
  })
  objectId: string

  @Prop({
    type: String,
    min: 9,
    required: true,
    unique: true,
    index: true,
  })
  phoneNumber: string

  @Prop({
    type: String,
    required: true,
  })
  password: string

  @Prop({
    type: Date,
    default: null,
  })
  latestLogin: Date

  @Prop({
    type: String,
    enum: USER_STATUS,
    default: ACTIVE,
  })
  static: string

  @Prop({
    type: String,
    enum: USER_LEVEL,
    default: USER,
  })
  level: string

  @Prop({
    type: String,
    default: null,
  })
  token: string

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'import-rates',
    index: true,
    default: null,
  })
  primaryGoodsType: importRateValue

  @Prop({
    type: Provider,
    default: null,
  })
  provider: Provider

  @Prop({
    type: Boolean,
    default: false,
  })
  changedPassword: boolean
}
export const UserSchema = SchemaFactory.createForClass(User)
