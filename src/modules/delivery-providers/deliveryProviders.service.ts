import {Inject, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Request, Response } from 'express';
import {deliveryProviders, deliveryProvidersDocument } from "./deliveryProviders.schema";
import { Model } from 'mongoose'
@Injectable()
export class DeliveryProvidersService {
  @InjectModel(deliveryProviders.name)
  private readonly DeliveryProvidersModule: Model<deliveryProvidersDocument>
    get(){
      this.DeliveryProvidersModule.find()
    }

}
