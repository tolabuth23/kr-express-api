import { Body, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import {
  OneTimePassword,
  OneTimePasswordDocument,
} from './one-time-password.schema'
import { Model } from 'mongoose'
import { DeleteByPhoneNumberDto } from './dto/delete-by-phone-number.dto'

@Injectable()
export class OneTimePasswordService {
  constructor(
    @InjectModel(OneTimePassword.name)
    private otpModel: Model<OneTimePasswordDocument>,
  ) {}
  async deleteByPhoneNumber(deleteByPhoneNumber: DeleteByPhoneNumberDto) {
    return this.otpModel.deleteMany(deleteByPhoneNumber)
  }
  async getByRef(ref: string) {
    return this.otpModel
      .findOne({ ref })
      .select({
        phoneNumber: 1,
        code: 1,
        ref: 1,
        type: 1,
        isVerified: 1,
        expiredAt: 1,
      })
      .lean()
  }

  async verify(ref: string) {
    return this.otpModel.updateOne({ ref }, { isVerified: true })
  }
}
