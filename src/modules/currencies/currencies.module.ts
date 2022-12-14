import { Module } from '@nestjs/common'
import { CurrenciesController } from './currencies.controller'
import { CurrenciesService } from './currencies.service'
import { MongooseModule } from '@nestjs/mongoose'
import { models } from '../../mongoose.providers'
import { DB_CONNECTION_NAME } from '../../constants'

@Module({
  imports: [MongooseModule.forFeature(models, DB_CONNECTION_NAME)],
})
export class CurrenciesModule {}
