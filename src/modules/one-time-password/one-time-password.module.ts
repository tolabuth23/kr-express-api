import { Module } from '@nestjs/common'
import { OneTimePasswordController } from './one-time-password.controller'
import { OneTimePasswordService } from './one-time-password.service'
import { models } from '../../mongoose.providers'
import { DB_CONNECTION_NAME } from '../../constants'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule.forFeature(models, DB_CONNECTION_NAME)],
})
export class OneTimePasswordModule {}
