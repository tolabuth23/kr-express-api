import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {goods} from "./goods.schema";
import { Request, Response } from 'express';
import {GoodsInterface} from "./interface/goods.interface";
@Injectable()
export class GoodsService {
    @InjectModel(goods.name)
    private readonly DeliveryProvidersModule: Model<GoodsInterface>

    async registerGoods(req: Request, res: Response){

    }
}
