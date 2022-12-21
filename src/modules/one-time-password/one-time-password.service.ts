import { Body, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import {
  OneTimePassword,
  OneTimePasswordDocument,
} from './one-time-password.schema'
import CreateOptDto from './dto/create-opt-dto'

@Injectable()
export class OneTimePasswordService {
  constructor(
    @InjectModel(OneTimePassword.name)
    private otpModel: Model<OneTimePassword>,
  ) {}
  async deleteByPhoneNumber(phoneNumber: string, code: string, type: string) {
    return this.otpModel.deleteMany({
      phoneNumber,
      code,
      type,
      isVerified: false,
    })
  }
  async getByRef(ref: string): Promise<OneTimePassword> {
    return this.otpModel.findOne({ ref })
  }

  async verify(ref: string) {
    return this.otpModel.updateOne({ ref }, { isVerified: true })
  }
  async create(createDto: CreateOptDto) {
    return this.otpModel.create(createDto)
  }
  async findByPhoneNumber(phoneNumber: string): Promise<OneTimePassword> {
    return this.otpModel.findOne({ phoneNumber })
  }
}
