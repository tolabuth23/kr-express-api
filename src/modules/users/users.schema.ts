import { ApiProperty } from '@nestjs/swagger'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaType, SchemaTypes } from 'mongoose'
import { nanoid } from 'nanoid'
import {
  ACTIVE,
  USER,
  USER_LEVEL,
  USER_ROLES,
  USER_STATUS,
} from '../../constants'
import mongoose from 'mongoose'
import { importRateValue } from '../importRate/importRateValue.schema'

export type UserDocument = User & Document

@Schema({
  _id: false,
})
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

export const AddressSchema = SchemaFactory.createForClass(Address)
@Schema({
  _id: false,
})
export class Social {
  @Prop({
    type: String,
  })
  id: string
}
export const SocialSchema = SchemaFactory.createForClass(Social)
@Schema({
  _id: false,
})
export class Provider {
  @Prop({ type: Social })
  line: Social
}
export const ProviderSchema = SchemaFactory.createForClass(Provider)
@Schema({
  collection: 'users',
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({
    type: String,
    //unique: true,
  })
  email: string

  @Prop({
    type: String,
    required: true,
  })
  displayName: string

  @Prop({
    type: [],
    required: true,
  })
  addresses: Address[]

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
  status: string

  @Prop({
    type: [String],
    enum: USER_ROLES,
    default: [USER],
  })
  roles: string[]

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
    type: SchemaTypes.ObjectId,
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
