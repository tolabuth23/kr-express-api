import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { MongooseModule } from '@nestjs/mongoose'
import { models } from '../../mongoose.providers'
import { DB_CONNECTION_NAME } from '../../constants'
import { SequenceService } from '../sequences/sequence.service'
import { SequenceModule } from '../sequences/sequence.module'

@Module({
  imports: [
    MongooseModule.forFeature(models, DB_CONNECTION_NAME),
    SequenceModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, UsersModule],
})
export class UsersModule {}
