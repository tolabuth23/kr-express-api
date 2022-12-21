import { BadRequestException, Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { CreateGoodsDTO } from './dto/createGoods.dto'
import { DeliveredGoodsDTO } from './dto/deliveredGoods.dto'
import { InDestinationGoodsDTO } from './dto/inDestinationGoods.dto'
import { RegisterGoodsDTO } from './dto/registerGoods.dto'
import { Goods } from './goods.schema'
import { GoodsService } from './goods.service'
import { DeliveredGoodsInterface } from './interfaces/deliveredGoods.interface'
import { GoodsInterface } from './interfaces/goods.interface'
import { InDestinationInterface } from './interfaces/inDestination.interface'
import { ValidationDeliveredPipe } from './pipes/validationDelivered.pipe'
import { validationDeliveredByGoodsPipe } from './pipes/validationDeliveredByGoods.pipe'
import { ValidationInDestinationPipe } from './pipes/validationInDestination.pipe'
import { ValidationInDestinationGoodPipe } from './pipes/validationInDestinationGood.pipe'
import { ValidationGoodsByObjectId } from './pipes/validationRegisterGoods.pipe'

@Controller('goods')
@ApiTags('Goods')
export class GoodsController {
  constructor(private goodsService: GoodsService) {
  }

  @Get()
  getListGoods() {
    return
  }

  @ApiBody({
    type: CreateGoodsDTO
  })
  @Post()
  async createGoods(
    @Body() createGoods: CreateGoodsDTO,
    req: Request,
    res: Response
  ) {
    return await this.goodsService.goodsCreate(req, res, createGoods)
  }

  @ApiParam({
    name: 'objectId',
    type: String
  })
  @Get(':objectId')
  getGoodByObjectId(
    @Param('objectId', ValidationGoodsByObjectId) goods: Goods
  ) {
    return this.goodsService.getOneGoods(goods)
  }

  @ApiParam({
    name: 'objectId',
    type: String
  })
  @ApiBody({
    type: RegisterGoodsDTO
  })

  @Put('register/:objectId')
  goodsRegister(@Param('objectId', ValidationGoodsByObjectId) goods: Goods,
                @Body() registerGoodsDTO: RegisterGoodsDTO
  ) {
    return this.goodsService.registerGoods(goods, registerGoodsDTO)
  }

  @ApiParam({
    name: 'objectId',
    type: String
  })
  @ApiBody({
    type: InDestinationGoodsDTO
  })
  @Put('in-destination/:objectId')
  async InDestination(
    @Param('objectId', ValidationInDestinationGoodPipe) goods: GoodsInterface,
    @Body(ValidationInDestinationPipe) inDestinationGoods: InDestinationInterface
  ) {
    try {
      await this.goodsService.inDestinationGoods(goods, inDestinationGoods)
    } catch (e) {
      throw new BadRequestException({
        message: e.message ?? e
      })
    }
    return
  }

  @ApiParam({
    name: 'ObjectId',
    type: String
  })
  @ApiBody({
    type: DeliveredGoodsDTO
  })
  @Put('/delivered/:objectId')
  validateDeliveredGoods(
    @Param('objectId', validationDeliveredByGoodsPipe) goods: GoodsInterface,
    @Body(ValidationDeliveredPipe) deliveredGoods: DeliveredGoodsInterface) {
    return
  }
}
