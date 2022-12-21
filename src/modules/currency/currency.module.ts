import { Module } from '@nestjs/common'
import { CurrencyService } from './currency.service'
import { MongooseModule } from '@nestjs/mongoose'
import {DB_CONNECTION_NAME} from "../../constants";
import {models} from "../../mongoose.providers";
import {CategoryService} from "../category/category.service";
import {ImportRateService} from "../importRate/importRate.service";

@Module({
  imports: [MongooseModule.forFeature(models, DB_CONNECTION_NAME)],
  providers: [CurrencyService, CategoryService, ImportRateService],
})
export class CurrencyModule {}
