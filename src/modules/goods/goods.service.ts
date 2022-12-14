import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {deliveryProviders, deliveryProvidersDocument} from "../delivery-providers/deliveryProviders.schema";
import {Model} from "mongoose";
import {goods} from "./goods.schema";
import { Request, Response } from 'express';
@Injectable()
export class GoodsService {
    @InjectModel(goods.name)
    private readonly DeliveryProvidersModule: Model<deliveryProvidersDocument>

    async registerGoods(req: Request, res: Response){

    }
}
