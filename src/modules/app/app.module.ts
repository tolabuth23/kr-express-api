import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { CurrenciesModule } from '../currencies/currencies.module'
import { DeliveryProvidersModule } from '../delivery-providers/deliveryProviders.module'
import { GoodsModule } from '../goods/goods.module'
import configuration from '../../config/configuration'
import { mongooseModuleAsyncOptions } from '../../mongoose.providers'
import { AuthModule } from '../authentication/auth.module'
import { ImportRateModule } from '../importRate/importRate.module'
import { ShipPeriodModule } from '../ship-period/ship-period.module'
import { SequenceModule } from '../sequences/sequence.module'
import { UsersModule } from '../users/users.module'
import { PublicModule } from '../public/public.module'
import { PublicAuthenticationModule } from '../public-authentication/public-authentication.module'
import { RequestModule } from '../request/request.module'

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
    AuthModule,
    ImportRateModule,
    ShipPeriodModule,
    SequenceModule,
    UsersModule,
    PublicModule,
    PublicAuthenticationModule,
    RequestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
