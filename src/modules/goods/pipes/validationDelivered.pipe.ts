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
import { DeliveryProviders } from '../../delivery-providers/deliveryProviders.schema'
import { deliveryProvidersInterFace } from '../../delivery-providers/interface/deliveryProviders.interface'
import { ImportRate, importRateDocument } from '../../importRate/schemas/importRate.schema'
import { User, UserDocument } from '../../users/users.schema'
import { DeliveredGoodsDTO } from '../dto/deliveredGoods.dto'
import { DeliveredGoodsInterface } from '../interfaces/deliveredGoods.interface'

@Injectable()
export class ValidationDeliveredPipe
  implements PipeTransform<DeliveredGoodsDTO> {
  private readonly logger: LoggerService = new LoggerService(
    ValidationDeliveredPipe.name
  )

  constructor(
    @InjectModel(User.name) private readonly userModule: Model<UserDocument>,
    @InjectModel(ImportRate.name) private readonly importRateModule: Model<importRateDocument>,
    @InjectModel(Currency.name) private readonly currencyModel: Model<CurrencyDocument>,
    @InjectModel(DeliveryProviders.name) private readonly deliveryProvidersModule: Model<deliveryProvidersInterFace>) {
  }

  async transform(deliveredGoods: DeliveredGoodsDTO, metadata: ArgumentMetadata): Promise<DeliveredGoodsInterface> {

    try {
      const { userId, category, currencyUnit, trackingProvider } = deliveredGoods
      const User = await this.userModule.findById(userId)
      if (!User) {
        this.logger.error(`${ValidationDeliveredPipe.name}: ${userId} not found`)
        throw new BadRequestException({
          message: 'user not found'
        })
      }
      const Category = await this.importRateModule.findById(category)
      if (!Category) {
        this.logger.error(`${ValidationDeliveredPipe.name}: ${Category} not found`)
        throw new BadRequestException({
          message: 'Category not found'
        })
      }
      const Currency = await this.currencyModel.findOne({ currencyUnit: currencyUnit })
      if (!Currency) {
        this.logger.error(`${ValidationDeliveredPipe.name}: ${currencyUnit} not found`)
        throw new BadRequestException({
          message: 'currencyUnit not found'
        })
      }
      const DeliveryProvider = await this.deliveryProvidersModule.findById(trackingProvider)
      if (!DeliveryProvider) {
        this.logger.error(`${ValidationDeliveredPipe.name}: ${trackingProvider} not found`)
        throw new BadRequestException({
          message: 'trackingProvider not found'
        })
      }
      return {
        ...deliveredGoods,
        category: Category,
        currencyUnit: Currency,
        user: User
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
