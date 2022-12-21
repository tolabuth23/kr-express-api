import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Request, Response } from 'express'
import { Model } from 'mongoose'
import shortid from 'shortid'
import { DeliveryProviders } from './deliveryProviders.schema'
import { deliveryProvidersIntiData } from './init/deliveryProvidersIntiData.init'
import { deliveryProvidersInterFace } from './interface/deliveryProviders.interface'

@Injectable()
export class DeliveryProvidersService implements OnModuleInit {
  @InjectModel(DeliveryProviders.name)
  private readonly deliveryProvidersModule: Model<deliveryProvidersInterFace>

  async getDeliveryProviders(req: Request, res: Response) {
    const s = ''
    const page = 1
    const perPage = 0
    const query: any = {}
    if (s !== '') {
      query['$or'] = [
        {
          title: new RegExp(`^${s}`, 'gi')
        }
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
      records
    }
    return res.send({ payload })
  }

  async onModuleInit() {
    const providers = await this.deliveryProvidersModule.count()
    if (!providers) {
      for (const i of deliveryProvidersIntiData) {
        const deliveryProviders = new this.deliveryProvidersModule({
          title: i.title,
          requiredTrackingId: i.requiredTrackingId,
          objectId: shortid.generate()
        })

        await deliveryProviders.save()
      }

    }
  }
}
