import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Request, Response } from 'express'
import { sumBy, times } from 'lodash'
import { Model, UpdateQuery } from 'mongoose'
import shortid from 'shortid'
import { IN_DESTINATION, JP, REGISTERED, TH } from '../../constants'
import { deliveryStatus } from '../enums/deliveryStatus.enum'
import { LoggerService } from '../logger/logger.service'
import { ShipPeriod, shipPeriodDocument } from '../ship-period/ship-period.schema'
import { User, UserDocument } from '../users/users.schema'
import { UsersService } from '../users/users.service'
import Currency from '../utils/Currency'
import QRCode from '../utils/QRCode'
import { CreateGoodsDTO } from './dto/createGoods.dto'
import { GoodsDTO } from './dto/goods.dto'
import { RegisterGoodsDTO } from './dto/registerGoods.dto'
import { Goods, GoodsDocument } from './goods.schema'
import { DeliveredGoodsInterface } from './interfaces/deliveredGoods.interface'
import { GoodsInterface } from './interfaces/goods.interface'
import { InDestinationInterface } from './interfaces/inDestination.interface'

@Injectable()
export class GoodsService {
  private readonly logger: LoggerService = new LoggerService(GoodsService.name)

  constructor(
    @InjectModel(Goods.name) private readonly goodsModule: Model<GoodsDocument>,
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
    @InjectModel(ShipPeriod.name)
    private readonly shipPeriodModel: Model<shipPeriodDocument>,
    private userService: UsersService
  ) {
  }

  async goodsCreate(req: Request, res: Response, newGoods: CreateGoodsDTO) {
    const { amount, user } = newGoods
    let goodsUserOwner
    try {
      goodsUserOwner = await this.userService.findById(user)
    } catch (error) {
      this.logger.error(
        `catch on getRanchCertificateById: ${error.message ?? error}`
      )
      throw new InternalServerErrorException({
        message: error.message ?? error
      })
    }
    if (!goodsUserOwner) {
      this.logger.error(`User: ${user} not found`)
      throw new BadRequestException({
        message: 'User not found'
      })
    }

    const promises = times(amount, async () => {
      const createData = {
        ...GoodsDTO,
        user: goodsUserOwner,
        objectId: shortid.generate()
      }
      const qrCodeInstance = new QRCode({ data: createData })
      const qr = await qrCodeInstance.getQR()

      return new Promise((resolve) => {
        resolve({
          ...createData,
          qr
        })
      })
    })
    const qrCode = await Promise.all(promises)
    return await this.goodsModule.create(qrCode)
  }

  async registerGoods(goods: Goods, registerDto: RegisterGoodsDTO) {
    const user = await this.userService.findById(registerDto.user.objectId)
    const originArrivedAt = goods.status === REGISTERED ? goods.originArrivedAt : new Date()
    const registerBody = {
      ...registerDto,
      status: REGISTERED,
      originArrivedAt,
      meta: {
        userObjectId: user.objectId
      },
      origin: JP,
      destination: TH
    }
    await this.goodsModule.findOneAndUpdate({ objectId: goods.objectId }, registerBody, { new: true })
  }

  async getOneGoods(goods: Goods) {
    const goodsOne = await this.goodsModule
      .findOne({ objectId: goods.objectId })
      .populate('user', ['objectId', 'level', 'displayName'])
      .lean()
    return goodsOne
  }

  async inDestinationGoods(goods: GoodsInterface, inDestinationGoods: InDestinationInterface) {
    const { category, currency, cod, weight, rate } = inDestinationGoods

    const currencyInstance = new Currency({
      weight: weight,
      category: category.value,
      currencyRate: currency.value,
      cod: goods.cod,
      userRole: goods.user.level,
      rate: rate
    })

    const registerBody: UpdateQuery<GoodsDocument> = {
      ...inDestinationGoods,
      currency,
      total: currencyInstance.getTotal(),
      status: IN_DESTINATION,
      destinationArrivedAt: new Date(),
      weighedAt: new Date(),
      importRate: currencyInstance.getImportRate()
    }

    return await Promise.all([
      this.goodsModule.findOneAndUpdate({ objectId: goods.objectId }, registerBody, { new: true }),
      this.shipPeriodModel.findOneAndUpdate({ _id: goods.shipPeriod }, { status: IN_DESTINATION })
    ])
  }

  deliveredGoods(goods: GoodsInterface, deliveredGoods: DeliveredGoodsInterface) {
    return
  }

  async findGoodsByObjectId(objectId: string): Promise<Goods> {
    return this.goodsModule.findOne({ objectId: objectId }).lean()
  }

  async countGoodsReceivedByShipPeriod(shipPeriodId: string) {
    return this.goodsModule.count({ _id: shipPeriodId }).lean()
  }

  async countGoodsInDestinationByShipPeriod(shipPeriodId: string) {
    const record = await this.getGoodsInDestinationByShipPeriod(shipPeriodId)
    return record.length
  }

  async getGoodsInDestinationByShipPeriod(shipPeriod, query = {}) {
    return this.goodsModule
      .find({
        _id: shipPeriod,
        status: {
          $in: [deliveryStatus.IN_DESTINATION, deliveryStatus.DELIVERED],
          ...query
        }
      })
      .lean()
  }

  async countUserOrderByShipPeriod(shipPeriod, query = {}) {
    const record = await this.getUserOrderByShipPeriod(shipPeriod)
    return record.length
  }

  async getUserOrderByShipPeriod(shipPeriod, query = {}, skip = 0, limit = 0) {
    const aggregate: any = [
      {
        $match: {
          shipPeriod,
          ...query
        }
      },
      {
        $group: {
          _id: '$deliveryAddress._id',
          deliveryAddress: { $first: '$deliveryAddress' },
          user: { $first: '$user' },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $skip: skip }
    ]

    if (limit > 0) {
      const limitOptions = {
        $limit: limit
      }

      aggregate.push(limitOptions)
    }
    return this.goodsModule.aggregate(aggregate)
  }

  async countUsersTookGoodsByShipPeriod(shipPeriod) {
    const records = await this.goodsModule.aggregate([
      {
        $match: {
          shipPeriod,
          status: deliveryStatus.DELIVERED
        }
      },
      {
        $group: {
          _id: '$user',
          count: { $sum: 1 }
        }
      }
    ])
    return sumBy(records, 'count')
  }

  async updateGoodsMany(shipPeriodId, updateBody) {
    return this.goodsModule.updateMany({ shipPeriod: shipPeriodId }, updateBody)
  }
}
