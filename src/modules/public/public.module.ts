import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { models } from '../../mongoose.providers'
import { DB_CONNECTION_NAME } from '../../constants'
import { PublicService } from './public.service'
import { UsersModule } from '../users/users.module'
import { SequenceModule } from '../sequences/sequence.module'
import { PublicController } from './public.controller'
import { UsersService } from '../users/users.service'

@Module({
  imports: [
    MongooseModule.forFeature(models, DB_CONNECTION_NAME),
    SequenceModule,
    UsersModule,
  ],
  controllers: [PublicController],
  providers: [PublicService, UsersService],
})
export class PublicModule {}
