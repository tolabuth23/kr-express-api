import { Module } from '@nestjs/common'
import { ShipPeriodService } from './ship-period.service'
import { ShipPeriodController } from './ship-period.controller'
import {UsersModule} from "../users/users.module";
import {MongooseModule} from "@nestjs/mongoose";
import {models} from "../../mongoose.providers";
import {DB_CONNECTION_NAME} from "../../constants";

@Module({
  imports: [MongooseModule.forFeature(models, DB_CONNECTION_NAME)],
  controllers: [ShipPeriodController],
  providers: [ShipPeriodService],
})
export class ShipPeriodModule {}
