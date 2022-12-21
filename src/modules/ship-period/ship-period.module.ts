import { Module } from "@nestjs/common";
import { ShipPeriodService } from "./ship-period.service";
import { ShipPeriodController } from "./ship-period.controller";
import { UsersModule } from "../users/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { models } from "../../mongoose.providers";
import { DB_CONNECTION_NAME } from "../../constants";
import { SequenceModule } from "../sequences/sequence.module";
import { GoodsModule } from "../goods/goods.module";
import { GoodsService } from "../goods/goods.service";
import { UsersService } from "../users/users.service";

@Module({
  imports: [
    SequenceModule,
    GoodsModule,
    UsersModule,
    MongooseModule.forFeature(models, DB_CONNECTION_NAME)
  ],
  controllers: [ShipPeriodController],
  providers: [ShipPeriodService, ShipPeriodService, GoodsService, UsersService]
})
export class ShipPeriodModule {
}
