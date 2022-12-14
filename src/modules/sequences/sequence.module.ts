import { Module } from '@nestjs/common'
import { SequenceController } from './sequence.controller'
import { SequenceService } from './sequence.service'
import { MongooseModule } from '@nestjs/mongoose'
import { models } from '../../mongoose.providers'
import { DB_CONNECTION_NAME } from '../../constants'

@Module({
  imports: [MongooseModule.forFeature(models, DB_CONNECTION_NAME)],
  controllers: [SequenceController],
  providers: [SequenceService],
})
export class SequenceModule {}
