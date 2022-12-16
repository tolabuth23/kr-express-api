import { Module } from '@nestjs/common'
import { CurrenciesModule } from '../currencies/currencies.module'
import { DeliveryProvidersModule } from '../delivery-providers/deliveryProviders.module'
import { GoodsModule } from '../goods/goods.module'
import { ConfigModule } from '@nestjs/config'
import configuration from '../../config/configuration'
import { MongooseModule } from '@nestjs/mongoose'
import { mongooseModuleAsyncOptions } from '../../mongoose.providers'
import { OneTimePasswordModule } from '../one-time-password/one-time-password.module'
import { AuthModule } from '../authentication/auth.module'
import { ImportRateModule } from '../importRate/importRate.module'
import { ShipPeriodModule } from '../ship-period/ship-period.module'
import { SequenceModule } from '../sequences/sequence.module'
import { UsersModule } from '../users/users.module'
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
    OneTimePasswordModule,
    AuthModule,
    ImportRateModule,
    ShipPeriodModule,
    SequenceModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
