import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  PipeTransform
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IN_TRANSIT } from '../../../constants'
import { LoggerService } from '../../logger/logger.service'
import { Goods, GoodsDocument } from '../goods.schema'
import { GoodsInterface } from '../interfaces/goods.interface'

@Injectable()
export class ValidationInDestinationGoodPipe
  implements PipeTransform<string> {
  private readonly logger: LoggerService = new LoggerService(
    ValidationInDestinationGoodPipe.name
  )

  constructor(
    @InjectModel(Goods.name) private readonly goodsModule: Model<GoodsDocument>
  ) {
  }

  async transform(goodsId: string, metadata: ArgumentMetadata): Promise<GoodsInterface> {
    let goods: GoodsInterface
    try {
      goods = await this.goodsModule.findOne({
        objectId: goodsId,
        status: IN_TRANSIT
      }).select({ qr: 0 })
        .populate('user', ['level'])
        .lean()
    } catch (error) {
      this.logger.error(
        `catch on getRanchCertificateById: ${error.message ?? error}`
      )
      throw new InternalServerErrorException({
        message: error.message ?? error
      })
    }
    if (!goods) {
      this.logger.error(`Goods: ${goodsId} not found`)
      throw new BadRequestException({
        message: 'Goods not found'
      })
    }
    return goods
  }
}
