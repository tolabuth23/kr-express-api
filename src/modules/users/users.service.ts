import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { User, UserDocument } from './users.schema'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.usersModel.create(createUserDto)
  }
  async findById(id: string): Promise<User> {
    return this.usersModel.findOne({ _id: id }).lean()
  }
  async findOne(phoneNumber: string): Promise<User | undefined> {
    return this.usersModel.findOne({ phoneNumber })
  }
}
