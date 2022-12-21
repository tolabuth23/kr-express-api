import { Module } from '@nestjs/common'
import { ImportRateController } from './importRate.controller'
import { ImportRateService } from './importRate.service'
import { MongooseModule } from '@nestjs/mongoose'
import { models } from '../../mongoose.providers'
import { DB_CONNECTION_NAME } from '../../constants'

@Module({
  imports: [MongooseModule.forFeature(models, DB_CONNECTION_NAME)],
  controllers: [ImportRateController],
  providers: [ImportRateService],
  exports: [ImportRateService],
})
export class ImportRateModule {}
