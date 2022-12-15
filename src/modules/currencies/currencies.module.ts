import { Module } from '@nestjs/common'
import { CurrenciesController } from './currencies.controller'
import { CurrenciesService } from './currencies.service'
import { MongooseModule } from '@nestjs/mongoose'
import { models } from '../../mongoose.providers'
import { DB_CONNECTION_NAME } from '../../constants'
import {GoodsController} from "../goods/goods.controller";
import {GoodsService} from "../goods/goods.service";

@Module({
  imports: [MongooseModule.forFeature(models, DB_CONNECTION_NAME)],
  controllers: [CurrenciesController],
  providers: [CurrenciesService]
})
export class CurrenciesModule {}
