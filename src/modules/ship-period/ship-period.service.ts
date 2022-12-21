import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { startOfDay } from 'date-fns'
import { sumBy } from 'lodash'
import { Model } from 'mongoose'
import { IN_DESTINATION, WAITING_TO_RECEIVE } from '../../constants'
import { deliveryStatus } from '../enums/deliveryStatus.enum'
import { GoodsService } from '../goods/goods.service'
import { SequenceService } from '../sequences/sequence.service'
import { User, UserDocument } from '../users/users.schema'
import { UsersService } from '../users/users.service'
import { CreateShipPeriodDTO } from './dto/createShipPeriod.dto'
import { ShipPeriodInterface } from './interface/shipPeriod.interface'
import { ShipPeriod, shipPeriodDocument } from './ship-period.schema'

@Injectable()
export class ShipPeriodService {
  constructor(
    @InjectModel(ShipPeriod.name)
    private readonly shipPeriodModel: Model<shipPeriodDocument>,
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
    private readonly sequencesService: SequenceService,
    private readonly goodsService: GoodsService,
    private readonly userService: UsersService
  ) {
  }

  async shipPeriodCreate(endAt: CreateShipPeriodDTO) {
    const { value: runningNumber } =
      await this.sequencesService.getNextSequence('SHIP_PERIOD')
    const shipPeriod = new this.shipPeriodModel({ ...endAt, runningNumber })
    await shipPeriod.save()
  }

  async getListShopPeriod() {
    const page = 1
    const perPage = 20

    const count = await this.shipPeriodModel.count()
    const shipPeriods = await this.shipPeriodModel
      .find()
      .skip((page - 1) * +perPage)
      .limit(+perPage)
      .sort({ endAt: 1 })
      .lean()

    const records = []
    for (const shipPeriod of shipPeriods) {
      const promises: any[] = [
        this.goodsService.countGoodsReceivedByShipPeriod(shipPeriod._id),
        this.goodsService.countGoodsInDestinationByShipPeriod(shipPeriod._id),
        this.goodsService.countUserOrderByShipPeriod(shipPeriod._id),
        this.goodsService.countUsersTookGoodsByShipPeriod(shipPeriod._id)
      ]
      const [goodsReceived, goodsInDestination, usersOrder, usersTookGoods] =
        await Promise.all(promises)

      records.push({
        ...shipPeriod,
        goodsReceived,
        goodsInDestination,
        usersOrder,
        usersTookGoods
      })
    }
    return {
      page,
      perPage,
      count,
      records
    }
  }

  async getOneShipPeriod(objectId: string) {
    const shipPeriod = await this.shipPeriodModel.findOne({ objectId }).lean()
    const pGoodsCount: number =
      await this.goodsService.countGoodsReceivedByShipPeriod(shipPeriod._id)
    const pUserOrderCount: number =
      await this.goodsService.countUserOrderByShipPeriod(shipPeriod._id)
    const [goodsCount, userOrderCount] = await Promise.all([
      pGoodsCount,
      pUserOrderCount
    ])
    const payload = {
      ...shipPeriod,
      goodsCount,
      userOrderCount
    }
    return payload
  }

  async getAvailableShiPeriod() {
    const query = {
      status: WAITING_TO_RECEIVE,
      endAt: {
        $gte: startOfDay(new Date())
      }
    }
    const page = 1
    const perPage = 20
    const pCount = await this.shipPeriodModel.count(query)
    const pRecord = await this.shipPeriodModel
      .find(query)
      .skip((page - 1) * +perPage)
      .limit(+perPage)
      .sort({ endAt: 1 })
      .lean()
    return {
      page,
      perPage,
      pCount,
      pRecord
    }
  }

  async updateToInTransit(shipPeriod: shipPeriodDocument) {
    const updateBody = {
      status: deliveryStatus.IN_TRANSIT
    }
    const pUpdateShipPeriod = await this.shipPeriodModel.findOneAndUpdate({ objectId: shipPeriod.objectId },
      updateBody
    )
    const pUpdateGoods = await this.goodsService.updateGoodsMany(
      shipPeriod._id,
      updateBody
    )
    console.log(pUpdateShipPeriod)
    await Promise.all([pUpdateShipPeriod, pUpdateGoods])
  }

  async updateToInDestination(shipPeriod: ShipPeriodInterface) {
    const updateBody = {
      status: IN_DESTINATION
    }
    return this.shipPeriodModel.updateOne(
      { objectId: shipPeriod.objectId },
      updateBody
    )
  }

  async getUserOrder(objectId: string) {
    const s = ''
    const page = 1
    const perPage = 20
    const query: any = {}
    const shipPeriod = await this.shipPeriodModel.findById({
      objectId: objectId
    })
    if (s !== '') {
      query['$or'] = [
        {
          objectId: new RegExp(`^${s}`, 'gi')
        },
        {
          'meta.userObjectId': new RegExp(`^${s}`, 'gi')
        },
        {
          'deliveryAddress.name': new RegExp(`^${s}`, 'gi')
        }
      ]
    }
    const [userOrders, count] = await Promise.all([
      this.goodsService.getUserOrderByShipPeriod(
        shipPeriod._id,
        query,
        (page - 1) * +perPage,
        perPage
      ),
      this.goodsService.countUserOrderByShipPeriod(shipPeriod._id, query)
    ])
    const records = []
    for (const userOrder of userOrders) {
      const pUser = this.usersModel
        .findById(userOrder.user)
        .select({ objectId: 1, phoneNumber: 1 })
        .lean()
      const pGoodsInDestination =
        this.goodsService.getGoodsInDestinationByShipPeriod(shipPeriod._id, {
          user: userOrder.user,
          'deliveryAddress._id': userOrder._id
        })
      const [user, goodsInDestination] = await Promise.all([
        pUser,
        pGoodsInDestination
      ])
      const obj = {
        ...user,
        paymentAmount: sumBy(goodsInDestination, 'total'),
        originGoodsReceive: userOrder.count,
        deliveryAddress: userOrder.deliveryAddress,
        goodsInDestination: goodsInDestination.length
      }
      records.push(obj)
    }
    return {
      page,
      perPage,
      count,
      records
    }
  }

  findShipPeriodByObjectIdAndStatus(objectId: string, status: string) {
    return this.shipPeriodModel.findOne({ objectId: objectId, status: status })
  }

  shipPeriodFindByEndAt(endAt: Date) {
    return this.shipPeriodModel.findOne({ endAt: endAt }).exec()
  }
}
