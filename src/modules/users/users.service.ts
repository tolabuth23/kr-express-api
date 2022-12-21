import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import shortid from 'shortid'
import padStart from 'lodash/padStart'
import bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto'
import { User, UserDocument } from './users.schema'
import { SequenceService } from '../sequences/sequence.service'
import { UpdateUserDto } from './dto/updateUser.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
    private sequenceService: SequenceService,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.usersModel.create(createUserDto)
  }
  async findById(id: string): Promise<User> {
    return this.usersModel.findOne({ _id: id }).lean()
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    return this.usersModel.findOne({ phoneNumber })
  }
  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersModel.findOne({ email })
  }

  async updateUserToken(phoneNumber: string, token: string) {
    return this.usersModel.updateOne({ phoneNumber }, { token: token })
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
    const page = 1
    const perPage = 20
    return this.usersModel
      .find()
      .select({ password: 0, token: 0 })
      .skip((page - 1) * +perPage)
      .limit(+perPage)
      .sort({ createdAt: -1 })
      .lean()
  }

  async getOneUser(objectId: string): Promise<UserDocument> {
    const user = await this.usersModel.findOne({ objectId })
    if (!user) throw new BadRequestException('User not have !!!')
    return user
  }

  async resetPasswordUser(objectId: string): Promise<any> {
    const plainPassword = shortid.generate()
    console.log(plainPassword)
    const hash = await bcrypt.hash(plainPassword, 10)
    console.log(hash)
    await this.usersModel.updateOne(
      { objectId },
      { password: hash, changedPassword: true },
    )
    const payload = {
      objectId,
      newPassword: plainPassword,
    }
    return payload
  }
}
