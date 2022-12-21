import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { ApiParam, ApiTags } from '@nestjs/swagger'
import { CreateShipPeriodDTO } from './dto/createShipPeriod.dto'
import { ValidationDatePipe } from './pipe/validationDate.pipe'
import { ShipPeriodService } from './ship-period.service'
import {shipPeriodDocument} from "./ship-period.schema";
import {ValidationShipperByObjectIdPipe} from "./pipe/validationShipperiodByObjectId.pipe";

@Controller('/ship-periods')
@ApiTags('shipPeriods')
export class ShipPeriodController {
  constructor(private readonly shipPeriodService: ShipPeriodService) {}
  @Post()
  shipPeriodCreate(@Body(ValidationDatePipe) endAt: CreateShipPeriodDTO) {
    return this.shipPeriodService.shipPeriodCreate(endAt)
  }
  @Get()
  getListShipPeriod() {}
  @Get()
  getAvailableShiPeriod() {}
  @Get(':objectId')
  getOneShipPeriod(@Param() objectId: string) {}
  @ApiParam({
    name: 'objectId',
    type: String,
  })
  @Get(':objectId/users')
  getUserOrder(@Param() objectId: string) {
    console.log(objectId)
  }
  @ApiParam({
    name: 'objectId',
    type: String,
  })
  @Put('in-transit/:objectId')
  updateToInTransit(@Param('objectId',ValidationShipperByObjectIdPipe) shipPeriod: shipPeriodDocument) {
    return this.shipPeriodService.updateToInTransit(shipPeriod);
  }
  @Put('in-destination/:objectId')
  updateToInDestination(@Param() objectId: string) {}
}
