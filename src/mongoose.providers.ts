import { DB_CONNECTION_NAME } from './constants'
import { Currency, currencySchema } from './modules/currency/currency.schema'
import {
  DeliveryProviders,
  deliveryProvidersSchema,
} from './modules/delivery-providers/deliveryProviders.schema'
import { Goods, goodsSchema } from './modules/goods/goods.schema'
import {
  ImportRate,
  importRateSchema,
} from './modules/importRate/schemas/importRate.schema'
import { Sequence, SequenceSchema } from './modules/sequences/sequence.schema'
import {
  ShipPeriod,
  shipPeriodSchema,
} from './modules/ship-period/ship-period.schema'
import { User, UserSchema } from './modules/users/users.schema'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose'

export const models = [
  {
    name: DeliveryProviders.name,
    schema: deliveryProvidersSchema,
  },
  {
    name: Goods.name,
    schema: goodsSchema,
  },
  {
    name: Currency.name,
    schema: currencySchema,
  },
  {
    name: User.name,
    schema: UserSchema,
  },
  {
    name: Sequence.name,
    schema: SequenceSchema,
  },
  {
    name: ImportRate.name,
    schema: importRateSchema,
  },
  {
    name: ShipPeriod.name,
    schema: shipPeriodSchema,
  },
]

export const mongooseModuleAsyncOptions: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  connectionName: DB_CONNECTION_NAME,
  useFactory: async (configService: ConfigService) => {
    return {
      uri: configService.get<string>('database.host'),
      ...configService.get<any>('database.options'),
    } as MongooseModuleAsyncOptions
  },
}
