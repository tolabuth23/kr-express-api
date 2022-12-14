import { Module } from '@nestjs/common'
import { ShipPeriodService } from './ship-period.service'
import { ShipPeriodController } from './ship-period.controller'

@Module({
  controllers: [ShipPeriodController],
  providers: [ShipPeriodService],
})
export class ShipPeriodModule {}
