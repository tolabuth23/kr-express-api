import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose'
import { DB_CONNECTION_NAME } from './constants'

import { User, UserSchema } from './modules/users/users.schema'
import { Sequence, SequenceSchema } from './modules/sequences/sequence.schema'
import {
  DeliveryProviders,
  deliveryProvidersSchema,
} from './modules/delivery-providers/deliveryProviders.schema'
import { Goods, goodsSchema } from './modules/goods/goods.schema'
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
import {
  OneTimePassword,
  OneTimePasswordSchema,
} from './modules/one-time-password/one-time-password.schema'

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
  {
    name: OneTimePassword.name,
    schema: OneTimePasswordSchema,
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
