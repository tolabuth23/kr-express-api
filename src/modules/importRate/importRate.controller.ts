import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiParam, ApiTags} from '@nestjs/swagger';
import {Request, Response} from "express";
import {CreateImportRateDTO} from "./dto/createImportRate.dto";
import {ImportRateService} from "./importRate.service";
import {UpdateImportRateDTO} from "./dto/updateImportRate.dto";
import {INACTIVE} from "../../constants";

@Controller('import-rates')
@ApiTags('importRate')
export class ImportRateController {
    constructor(private importRateService: ImportRateService) {
    }
    @Get()
    getImportRates(){
        return this.importRateService.getImportRates();
    }
    @ApiParam({
        name: "objectId",
        type: String
    })
    @Get(':objectId')
    getOneImportRates(@Param('objectId') objectId,req: Request, res: Response,){
        return this.importRateService.getOneImportRates(objectId);
    }
    @Post()
    createImportRates(req: Request, res: Response,@Body() createImportRate:CreateImportRateDTO){
        return this.importRateService.createImportRates(createImportRate)
    }
    @ApiParam({
        name: "objectId",
        type: String
    })
    @Put(':objectId')
    async updateImportRates(@Param('objectId') objectId,req: Request, res: Response,@Body() updateImportRate: UpdateImportRateDTO) {
        return await this.importRateService.updateImportRates(objectId,updateImportRate)
    }
    @ApiParam({
        name: "objectId",
        type: String
    })
    @Delete(':objectId')
    async deleteImportRates(@Param('objectId') objectId,req: Request, res: Response,){
        return this.importRateService.deleteImportRates(objectId);
    }

}
