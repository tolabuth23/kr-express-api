import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {goods} from "./goods.schema";
import { Request, Response } from 'express';
import {GoodsInterface} from "./interface/goods.interface";
import {GoodsDto} from "./dto/goods.dto";
@Injectable()
export class GoodsService {
    @InjectModel(goods.name)
    private readonly goodsModule: Model<GoodsInterface>

    async goodsCreate(req: Request, res: Response,goodsDto: GoodsDto){
        console.log(goodsDto)
        // const newGoods = await new this.goodsModule(goodsDto);
        // return newGoods.save();
    }
}
