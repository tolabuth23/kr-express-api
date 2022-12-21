import {Injectable, OnModuleInit} from '@nestjs/common';
import { Request, Response } from 'express';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {GoodsInterface} from "../goods/interfaces/goods.interface";
import {DeliveryProviders} from "./deliveryProviders.schema";
import {deliveryProvidersInterFace} from "./interface/deliveryProviders.interface";
import * as shortid from "shortid";
import {deliveryProvidersIntiData} from "./init/deliveryProvidersIntiData.init";
@Injectable()
export class DeliveryProvidersService implements OnModuleInit {
  @InjectModel(DeliveryProviders.name)
  private readonly deliveryProvidersModule: Model<deliveryProvidersInterFace>
  async getDeliveryProviders(req: Request, res: Response) {
    let s = '';
    let page = 1;
    const perPage: number = 0;
    const query: any = {}
    if (s !== '') {
      query['$or'] = [
        {
          title: new RegExp(`^${s}`, 'gi'),
        },
      ]
    }
    const pCount = this.deliveryProvidersModule.count(query)
    const pRecords = this.deliveryProvidersModule.find(query).find(query)
        .skip((Number(page) - 1) * (+perPage))
        .limit(+perPage)
        .sort({ createdAt: 1 })
        .lean()
    const [records, count] = await Promise.all([pRecords, pCount])
    const payload = {
      page,
      perPage,
      count,
      records,
    }
    return res.send({payload});
  }
  async onModuleInit(){
    const providers = await this.deliveryProvidersModule.count()
    if (!providers) {
      for(let i of deliveryProvidersIntiData){
        const deliveryProviders = new this.deliveryProvidersModule({
          title: i.title,
          requiredTrackingId: i.requiredTrackingId,
          objectId: shortid.generate()
        });

        await deliveryProviders.save()
      }

    }
  }
}
