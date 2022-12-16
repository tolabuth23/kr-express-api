import {BadRequestException, Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { Request, Response } from 'express';
import {ApiBody, ApiParam, ApiTags} from '@nestjs/swagger';
import {GoodsService} from "./goods.service";
import {RegisterGoodsDTO} from "./dto/registerGoods.dto";
import {CreateGoodsDTO} from "./dto/createGoods.dto";
import {InDestinationGoodsDTO} from "./dto/inDestinationGoods.dto";
import {GoodsDTO} from "./dto/goods.dto";
import {ValidationGoodsByObjectId} from "./pipes/validationGoodsByObjectId.pipe";
import {Goods, goodsDocument} from "./goods.schema";
import {LoggerService} from "../logger/logger.service";


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
  getGoodByObjectId(req: Request, res: Response, @Param('objectId',ValidationGoodsByObjectId) goods: Goods) {
    return this.goodsService.getOneGoods(goods);
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
  @Put('in-destination/:objectId')
  InDestination(req: Request, res: Response,@Param('objectId',ValidationGoodsByObjectId) goods: Goods) {
    try {
      this.goodsService.inDestinationGoods(goods)
    }catch (e){
      throw new BadRequestException({
        message: e.message ?? e,
      })
    }
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
