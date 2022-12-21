import { Module } from '@nestjs/common'
import { SequenceService } from './sequence.service'
import { MongooseModule } from '@nestjs/mongoose'
import { DB_CONNECTION_NAME } from '../../constants'
import { models } from '../../mongoose.providers'
import { SequenceController } from './sequence.controller'

@Module({
  imports: [MongooseModule.forFeature(models, DB_CONNECTION_NAME)],
  controllers: [SequenceController],
  providers: [SequenceService],
  exports: [SequenceService],
})
export class SequenceModule {}
