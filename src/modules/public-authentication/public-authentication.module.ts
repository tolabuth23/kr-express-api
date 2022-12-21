import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { models } from '../../mongoose.providers'
import { DB_CONNECTION_NAME } from '../../constants'
import { SequenceModule } from '../sequences/sequence.module'
import { PublicAuthenticationController } from './public-authentication.controller'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [
    MongooseModule.forFeature(models, DB_CONNECTION_NAME),
    SequenceModule,
    UsersModule,
  ],
  controllers: [PublicAuthenticationController],
})
export class PublicAuthenticationModule {}
