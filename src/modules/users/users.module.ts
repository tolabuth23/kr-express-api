import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { MongooseModule } from '@nestjs/mongoose'
import { models } from '../../mongoose.providers'
import { DB_CONNECTION_NAME } from '../../constants'
import { SequenceModule } from '../sequences/sequence.module'
import { RolesGuard } from '../authentication/guards/roles.guard'
import { OneTimePasswordModule } from '../one-time-password/one-time-password.module'

@Module({
  imports: [
    MongooseModule.forFeature(models, DB_CONNECTION_NAME),
    SequenceModule,
    OneTimePasswordModule,
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    UsersService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
