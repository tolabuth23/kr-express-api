import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './users.schema'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<User>,
  ) {}
  async findOne(username: string): Promise<User | undefined> {
    return this.usersModel.findOne({ username })
  }
}
