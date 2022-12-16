import {Controller, Get, Param, Post, Put} from '@nestjs/common'
import {ApiParam, ApiTags} from "@nestjs/swagger";

@Controller('/ship-periods')
@ApiTags('shipPeriods')
export class ShipPeriodController {
    @Post()
    shipPeriodCreate(){

    }
    @Get()
    getListShipPeriod(){

    }
    @Get()
    getAvailableShiPeriod(){

    }
    @Get(':objectId')
    getOneShipPeriod(@Param() objectId: string){

    }
    @ApiParam({
        name : "objectId",
        type: String
    })
    @Get(':objectId/users')
    getUserOrder(@Param() objectId: string){
        console.log(objectId)
    }
    @Put('in-transit/:objectId')
    updateToInTransit(@Param() objectId: string){

    }
    @Put('in-destination/:objectId')
    updateToInDestination(@Param() objectId: string){

    }
}
