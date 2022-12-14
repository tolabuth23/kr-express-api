import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { DB_CONNECTION_NAME } from './constants';
import {
  delivery_providers,
  deliveryProvidersSchema,
} from './modules/delivery-providers/deliveryProviders.schema';
export const models = [
  {
    name: delivery_providers.name,
    schema: deliveryProvidersSchema,
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
    } as MongooseModuleAsyncOptions;
  },
};
