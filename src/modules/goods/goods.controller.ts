import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { Request, Response } from 'express';
import {ApiBody, ApiParam, ApiTags} from '@nestjs/swagger';
import {GoodsService} from "./goods.service";
import {RegisterGoodsDTO} from "./dto/registerGoods.dto";
import {CreateGoodsDTO} from "./dto/createGoods.dto";
import {InDestinationGoodsDTO} from "./dto/inDestinationGoods.dto";


@Controller('goods')
@ApiTags('Goods')
export class GoodsController {
  constructor(private goodsService: GoodsService) {
  }
  @Get()
  getListGoods() {
    return ;
  }
  @ApiBody({
    type: CreateGoodsDTO
  })
  @Post()
  async createGoods(@Body() createGoods : CreateGoodsDTO,req: Request, res: Response,) {
    return await this.goodsService.goodsCreate(req,res,createGoods);
  }

  @ApiParam({
    name: 'ObjectId',
    type: String
  })
  @Get(':objectId')
  getGoodByObjectId(req: Request, res: Response, @Param('objectId') objectId: string) {
    return "arisak";
  }
  @ApiParam({
    name: 'ObjectId',
    type: String
  })
  @ApiBody({
    type: RegisterGoodsDTO,
  })
  validateRegister(req: Request, res: Response,@Body() registerGoodsDTO :RegisterGoodsDTO) {
    return;
  }
  @ApiParam({
    name: 'ObjectId',
    type: String
  })
  @ApiBody({
    type: InDestinationGoodsDTO,
  })
  @Put('/in-destination/:objectId')
  validateInDestination(req: Request, res: Response,@Body() inDestinationGoodsDTO :InDestinationGoodsDTO) {
    return;
  }
  @ApiParam({
    name: 'ObjectId',
    type: String
  })
  @Put('/delivered/:objectId')
  validateDeliveredGoods(req: Request, res: Response) {
    return;
  }
}
