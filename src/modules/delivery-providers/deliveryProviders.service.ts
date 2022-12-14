import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import {InjectModel} from "@nestjs/mongoose";
import {goods} from "../goods/goods.schema";
import {Model} from "mongoose";
import {GoodsInterface} from "../goods/interface/goods.interface";
import {deliveryProviders} from "./deliveryProviders.schema";
import {deliveryProvidersInterFace} from "./interface/deliveryProviders.interface";
@Injectable()
export class DeliveryProvidersService {
  @InjectModel(deliveryProviders.name)
  private readonly goodsModule: Model<deliveryProvidersInterFace>
  async getDeliveryProviders(req: Request, res: Response) {
    const { s = '', page = 1 } = req.query;
    return;
  }
}
