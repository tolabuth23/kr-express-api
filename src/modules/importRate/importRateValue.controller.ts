import {Controller, Delete, Get, Param, Put} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {Request, Response} from "express";

@Controller('importRates')
@ApiTags('importRateValue')
export class ImportRateValueController {

    @Get()
    getImportRates(){

    }
    @Get(':objectId')
    getOneImportRates(@Param('objectId') objectId,req: Request, res: Response,){

    }
    @Put(':objectId')
    updateImportRates(@Param('objectId') objectId,req: Request, res: Response,) {

    }
    @Delete(':objectId')
    deleteImportRates(@Param('objectId') objectId,req: Request, res: Response,){

    }

}
