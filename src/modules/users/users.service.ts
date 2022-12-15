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
  async createUser(user: CreateUserDto): Promise<UserDocument> {
    return this.usersModel.create(user)
  }
  async findById(objectId: string): Promise<User | undefined> {
    return this.usersModel.findOne({ objectId }).lean()
  }
}
