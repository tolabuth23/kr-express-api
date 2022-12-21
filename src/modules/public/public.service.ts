import { BadRequestException, Injectable, Req } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import bcrypt from 'bcrypt'
import { User } from '../users/users.schema'
import { ImportRate } from '../importRate/schemas/importRate.schema'
import { UpdateUserDto } from '../users/dto/updateUser.dto'
import { UserChangePasswordDto } from './dto/user-change-password'

@Injectable()
export class PublicService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(ImportRate.name) private importRateModel: Model<ImportRate>,
  ) {}

  async getCategories(): Promise<any> {
    const pRecord = this.importRateModel
      .find()
      .select({ _id: 1, name: 1 })
      .sort({ createdAt: 1 })
    const [records] = await Promise.all([pRecord])
    const payload = { records }
    return { payload }
  }
  async getMe(id: string): Promise<User> {
    return this.userModel
      .findOne({ id })
      .select({
        phoneNumber: 1,
        email: 1,
        displayName: 1,
        addresses: 1,
        provider: 1,
        changePassword: 1,
      })
      .lean()
  }
  async updateMe(_id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel
      .findOneAndUpdate({ _id }, { updateUserDto }, { new: true })
      .select({
        phoneNumber: 1,
        email: 1,
        displayName: 1,
        addresses: 1,
        provider: 1,
      })
      .lean()
    return user
  }

  async userChangePassword(userChangePassword: UserChangePasswordDto) {
    const { _id: userId, oldPassword, password } = userChangePassword
    const user = await this.userModel
      .findOne({ _id: userId })
      .select({ password: 1 })
      .lean()
    if (!user) {
      return Promise.reject('user not found')
    }
    const comparePassword = await bcrypt.compare(oldPassword, user.password)
    if (!comparePassword)
      throw new BadRequestException('The password not match')
    const body = {
      password: await bcrypt.hash(password, 10),
      changedPassword: true,
    }
    await this.userModel.updateOne({ _id: userId }, body)
    return Promise.resolve('User change password already')
  }
}
