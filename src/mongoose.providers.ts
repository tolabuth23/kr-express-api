import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose'
import { DB_CONNECTION_NAME } from './constants'
import {
  deliveryProviders,
  deliveryProvidersSchema,
} from './modules/delivery-providers/deliveryProviders.schema'
import { goods, goodsSchema } from './modules/goods/goods.schema'
import {
  OneTimePassword,
  OneTimePasswordSchema,
} from './modules/one-time-password/one-time-password.schema'
import { User, UserSchema } from './modules/users/users.schema';
import {} from './modules/delivery-providers/deliveryProviders.schema';
import {currencies, currenciesSchema} from "./modules/currencies/currencies.schema";
export const models = [
  {
    name: deliveryProviders.name,
    schema: deliveryProvidersSchema,
  },
  {
    name: goods.name,
    schema: goodsSchema
  },
  {
    name:currencies.name,
    schema: currenciesSchema
  },
  {
    name: User.name,
    schema: UserSchema,
  },
];



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
