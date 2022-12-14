import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import {GoodsService} from "./goods.service";
import {GoodsDto} from "./dto/goods.dto";

@Controller('goods')
@ApiTags('Goods')
export class GoodsController {
  constructor(private goodsService: GoodsService) {
  }
  @Get()
  getListGoods() {
    return ;
  }
  @Post()
  async createGoods(@Body() goodsDto : GoodsDto,req: Request, res: Response,) {
    console.log(goodsDto);
    return await this.goodsService.goodsCreate(req,res,goodsDto);
  }
  @Get('/goods/:objectId')
  getGoodByObjectId(req: Request, res: Response, @Param('objectId') objectId) {
    return;
  }
  @Put('/goods/register/:objectId')
  validateRegister(req: Request, res: Response) {
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
