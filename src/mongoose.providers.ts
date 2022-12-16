import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose'
import { DB_CONNECTION_NAME } from './constants'
import {
  deliveryProviders,
  deliveryProvidersSchema,
} from './modules/delivery-providers/deliveryProviders.schema'
import { goods, goodsSchema } from './modules/goods/goods.schema'

import { User, UserSchema } from './modules/users/users.schema'
import {} from './modules/delivery-providers/deliveryProviders.schema'
import { Sequence, SequenceSchema } from './modules/sequences/sequence.schema'

export const models = [
  {
    name: deliveryProviders.name,
    schema: deliveryProvidersSchema,
  },
  {
    name: goods.name,
    schema: goodsSchema,
  },
  {
    name: User.name,
    schema: UserSchema,
  },
  {
    name: Sequence.name,
    schema: SequenceSchema,
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
