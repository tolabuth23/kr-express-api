import { Module } from '@nestjs/common'
import { SequenceService } from './sequence.service'
import { MongooseModule } from '@nestjs/mongoose'
import { models } from '../../mongoose.providers'
import { DB_CONNECTION_NAME } from '../../constants'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [MongooseModule.forFeature(models, DB_CONNECTION_NAME)],
  providers: [SequenceService],
  exports: [SequenceService],
})
export class SequenceModule {}
