import { Module } from '@nestjs/common';
import { CurrenciesModule } from '../currencies/currencies.module';
import { DeliveryProvidersModule } from '../delivery-providers/deliveryProviders.module';
import { GoodsModule } from '../goods/goods.module';
import { ImportRateValueModule } from '../import-rate-value/import-rate-value.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseModuleAsyncOptions } from '../../mongoose.providers';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync(mongooseModuleAsyncOptions),
    CurrenciesModule,
    DeliveryProvidersModule,
    GoodsModule,
    ImportRateValueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
