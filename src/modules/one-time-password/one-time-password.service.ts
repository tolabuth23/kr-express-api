import { Body, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { OneTimePassword } from './one-time-password.schema'
import { Model } from 'mongoose'
import { DeleteByPhoneNumberDto } from './dto/delete-by-phone-number.dto'

@Injectable()
export class OneTimePasswordService {
  constructor(
    @InjectModel(OneTimePassword.name) private otpModel: Model<OneTimePassword>,
  ) {}
  async deleteByPhoneNumber(deleteByPhoneNumber: DeleteByPhoneNumberDto) {
    return this.otpModel.deleteMany(deleteByPhoneNumber)
  }
  async getByRef(ref: string) {
    return this.otpModel.findOne({ ref }).lean()
  }

  async verify(ref: string) {
    return this.otpModel.updateOne({ ref }, { isVerified: true })
  }
}
