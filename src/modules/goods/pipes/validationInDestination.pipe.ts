import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  PipeTransform
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { LoggerService } from 'src/modules/logger/logger.service'
import { Currency, CurrencyDocument } from '../../currency/currency.schema'
import { ImportRate, importRateDocument } from '../../importRate/schemas/importRate.schema'
import { User, UserDocument } from '../../users/users.schema'
import { InDestinationGoodsDTO } from '../dto/inDestinationGoods.dto'
import { Goods, GoodsDocument } from '../goods.schema'
import { InDestinationInterface } from '../interfaces/inDestination.interface'

@Injectable()
export class ValidationInDestinationPipe
  implements PipeTransform<InDestinationGoodsDTO> {
  private readonly logger: LoggerService = new LoggerService(
    ValidationInDestinationPipe.name
  )

  constructor(
    @InjectModel(Goods.name) private readonly goodsModule: Model<GoodsDocument>,
    @InjectModel(User.name) private readonly userModule: Model<UserDocument>,
    @InjectModel(ImportRate.name) private readonly importRateModule: Model<importRateDocument>,
    @InjectModel(Currency.name) private currenciesModel: Model<CurrencyDocument>
  ) {
  }

  async transform(inDestination: InDestinationGoodsDTO, metadata: ArgumentMetadata): Promise<InDestinationInterface> {
    const { trackingNumber, userId, category, currencyUnit, deliveryAddress, cod, rate, weight } = inDestination
    try {
      const goods = await this.goodsModule.findOne({ trackingNumber: trackingNumber }).lean()
      if (goods) {
        if (goods.trackingNumber !== trackingNumber) {
          this.logger.error(`Goods: ${trackingNumber} is already`)
          throw new BadRequestException({
            message: `${trackingNumber} is already`
          })
        }
      }
      const user = await this.userModule
        .findById(userId)
        .select({
          level: 1,
          objectId: 1
        })
        .lean()
      if (!user) {
        this.logger.error(`User: user not found`)
        throw new BadRequestException({
          message: 'user not found'
        })
      }

      const Category = await this.importRateModule
        .findById(category)
        .lean()
      if (!Category) {
        this.logger.error(`category not found`)
        throw new BadRequestException({
          message: 'category not found'
        })
      }

      const currency = await this.currenciesModel
        .findOne({ currencyUnit: currencyUnit })
        .lean()
      if (!currency) {
        this.logger.error(`currencyUnit not found`)
        throw new BadRequestException({
          message: 'currencyUnit not found'
        })
      }
      return {
        category: Category,
        cod: cod,
        currency: currency,
        deliveryAddress: deliveryAddress,
        rate: rate,
        trackingNumber: trackingNumber,
        user: user,
        weight: weight
      }

    } catch (error) {
      this.logger.error(
        `catch on getRanchCertificateById: ${error.message ?? error}`
      )
      throw new InternalServerErrorException({
        message: error.message ?? error
      })
    }

  }
}
