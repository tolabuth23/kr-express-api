import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('goods')
@ApiTags('Goods')
export class GoodsController {
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
