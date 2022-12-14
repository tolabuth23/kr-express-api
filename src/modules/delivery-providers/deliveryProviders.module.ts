import { Module } from '@nestjs/common'
import { DeliveryProvidersController } from './deliveryProviders.controller'
import { DeliveryProvidersService } from './deliveryProviders.service'
import { MongooseModule } from '@nestjs/mongoose'
import { DB_CONNECTION_NAME } from '../../constants'
import { models } from '../../mongoose.providers'

@Module({
  imports: [MongooseModule.forFeature(models, DB_CONNECTION_NAME)],
  controllers: [DeliveryProvidersController],
  providers: [DeliveryProvidersService],
})
export class DeliveryProvidersModule {}
