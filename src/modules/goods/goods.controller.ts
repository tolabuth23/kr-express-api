import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import {GoodsService} from "./goods.service";
@Controller('goods')
@ApiTags('Goods')
export class GoodsController {
  constructor(private goodsService : GoodsService) {
  }
  @Get()
  getListGoods() {
    return;
  }
  @Post()
  createGoods() {
    return;
  }
  @Get('/goods/:objectId')
  getGoodByObjectId(req: Request, res: Response, @Param('objectId') objectId) {
    return;
  }
  @Put('/goods/register/:objectId')
  async registerGoods(@Param('objectId') objectId ,req: Request, res: Response) {
    const s = await this.goodsService.registerGoods(req,res);
    return;
  }
  @Put('/goods/in-destination/:objectId')
  validateInDestination(req: Request, res: Response) {
    return;
  }
  @Put('/goods/delivered/:objectId')
  validateDeliveredGoods(req: Request, res: Response) {
    return;
  }
}
