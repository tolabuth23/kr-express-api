import {Inject, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Request, Response } from 'express';
import {deliveryProviders, deliveryProvidersDocument } from "./deliveryProviders.schema";
import {LoggerService} from "../logger/logger.service";
import { Model } from 'mongoose'

import {deliveryProvidersInterFace} from "./interface/deliveryProviders.interface";
import {DELIVERY_PROVIDERS_SERVICE} from "../../constants";

@Injectable()
export class DeliveryProvidersService {
  // private  readonly logger: LoggerService = new LoggerService(DeliveryProvidersService.name);

  @InjectModel(deliveryProviders.name)
  private readonly DeliveryProvidersModule: Model<deliveryProvidersDocument>
    get(){
      this.DeliveryProvidersModule.find()
    }
  // async getDeliveryProviders(req: Request, res: Response) {
  //   const { s = '', page = 1 } = req.query;
  //   const perPage: number = 0
  //   const query: any = {}
  //   if (s !== '') {
  //     query['$or'] = [
  //       {
  //         title: new RegExp(`^${s}`, 'gi'),
  //       },
  //     ]
  //   }
  //   const pCount = this.deliveryProvidersModel.count(query)
  //   const pRecords = this.deliveryProvidersModel
  //       .find(query)
  //       // .skip((page - 1) * (+perPage))
  //       .limit(+perPage)
  //       .sort({ createdAt: 1 })
  //       .lean()
  //   const [records, count] = await Promise.all([pRecords, pCount])
  //   const payload = {
  //     page,
  //     perPage,
  //     count,
  //     records,
  //   }
  //
  //
  // }
}
