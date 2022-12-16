import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { User, UserDocument } from './users.schema'
import * as padStart from 'lodash/padStart'

import { SequenceService } from '../sequences/sequence.service'
import { UpdateUserDto } from './dto/updateUser.dto'
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
    private sequenceService: SequenceService,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.usersModel.create(createUserDto)
  }
  async findById(id: string): Promise<User> {
    return this.usersModel.findOne({ _id: id }).lean()
  }
  async findByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    return this.usersModel.findOne({ phoneNumber })
  }

  async updateUser(
    objectId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    return this.usersModel
      .findOneAndUpdate(
        { objectId: objectId },
        { $set: updateUserDto },
        { new: true },
      )
      .lean()
  }
  async getUserObjectId() {
    const key = 'userObjectId'
    const prefix = 'KR'
    const sequence = await this.sequenceService.getNextSequence(key)
    const pad = padStart(sequence.value, 8, '0')
    return `${prefix}-${pad}`
  }

  async getListUsers(): Promise<UserDocument> {
    try {
      const page = 1
      const s = ''
      const perPage = 20
      return this.usersModel
        .find()
        .select({ password: 0, token: 0 })
        .skip((page - 1) * +perPage)
        .limit(+perPage)
        .sort({ createdAt: -1 })
        .lean()
    } catch (error) {}
  }
}
