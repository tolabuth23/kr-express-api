import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose'
import { DB_CONNECTION_NAME } from './constants'
import {
  DeliveryProviders,
  deliveryProvidersSchema,
} from './modules/delivery-providers/deliveryProviders.schema'
import { Goods, goodsSchema } from './modules/goods/goods.schema'
import { User, UserSchema } from './modules/users/users.schema'
import {
  Currencies,
  currenciesSchema,
} from './modules/currencies/currencies.schema'
import {
  ImportRate,
  importRateSchema,
} from './modules/importRate/schemas/importRate.schema'
import {
  ShipPeriod,
  shipPeriodSchema,
} from './modules/ship-period/ship-period.schema'
import { Sequence, sequenceSchema } from './modules/sequences/sequence.schema'
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
    name: Currencies.name,
    schema: currenciesSchema,
  },
  {
    name: User.name,
    schema: UserSchema,
  },
  {
    name: ImportRate.name,
    schema: importRateSchema,
  },
  {
    name: ShipPeriod.name,
    schema: shipPeriodSchema,
  },
  {
    name: Sequence.name,
    schema: sequenceSchema,
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
