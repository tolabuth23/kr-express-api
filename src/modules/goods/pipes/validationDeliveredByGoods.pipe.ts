import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  PipeTransform
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { DELIVERED, IN_DESTINATION } from '../../../constants'
import { LoggerService } from '../../logger/logger.service'
import { Goods, GoodsDocument } from '../goods.schema'

@Injectable()
export class validationDeliveredByGoodsPipe
  implements PipeTransform<string> {
  private readonly logger: LoggerService = new LoggerService(
    validationDeliveredByGoodsPipe.name
  )

  constructor(
    @InjectModel(Goods.name) private readonly goodsModule: Model<GoodsDocument>
  ) {
  }

  async transform(goodsId: string, metadata: ArgumentMetadata): Promise<Goods> {
    let goods: Goods
    try {
      goods = await this.goodsModule
        .findOne({
          objectId: goodsId,
          status: { $in: [IN_DESTINATION, DELIVERED] }
        })
        .select({ qr: 0 })
        .populate('user', ['level', 'objectId'])
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
