import { Module } from '@nestjs/common';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';
import {MongooseModule} from "@nestjs/mongoose";
import {models} from "../../mongoose.providers";
import {DB_CONNECTION_NAME} from "../../constants";

@Module({
  imports: [MongooseModule.forFeature(models, DB_CONNECTION_NAME)],
  controllers: [GoodsController],
  providers: [GoodsService]
})
export class GoodsModule {}
