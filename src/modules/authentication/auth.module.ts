import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { models } from '../../mongoose.providers'
import { DB_CONNECTION_NAME } from '../../constants'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import {JwtStrategy} from "./jwt-strategy";
import {JwtService} from "@nestjs/jwt";

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [JwtStrategy,AuthService,JwtService],
  exports: [AuthService],
})
export class AuthModule {}
