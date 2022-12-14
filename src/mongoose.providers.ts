import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { DB_CONNECTION_NAME } from './constants';
import {
  deliveryProviders,
  deliveryProvidersSchema,
} from './modules/delivery-providers/deliveryProviders.schema';
import {currencies, currenciesSchema} from "./modules/currencies/currencies.shema";
import {goods, goodsSchema} from "./modules/goods/goods.schema";
export const models = [
  {
    name: deliveryProviders.name,
    schema: deliveryProvidersSchema,
  },
  {
    name: currencies.name,
    schema: currenciesSchema
  },
  {
    name: goods.name,
    schema: goodsSchema
  }
];

export const mongooseModuleAsyncOptions: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  connectionName: DB_CONNECTION_NAME,
  useFactory: async (configService: ConfigService) => {
    return {
      uri: configService.get<string>('database.host'),
      ...configService.get<any>('database.options'),
    } as MongooseModuleAsyncOptions;
  },
};
