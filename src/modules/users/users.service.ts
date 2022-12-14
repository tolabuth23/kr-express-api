import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './users.schema'
import { Model } from 'mongoose'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email })
  }
}
