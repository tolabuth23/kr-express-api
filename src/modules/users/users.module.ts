import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { MongooseModule } from '@nestjs/mongoose'
import { models } from '../../mongoose.providers'
import { DB_CONNECTION_NAME } from '../../constants'

@Module({
  imports: [MongooseModule.forFeature(models, DB_CONNECTION_NAME)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
