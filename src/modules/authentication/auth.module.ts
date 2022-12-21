import { CacheModule, Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt-strategy'
import { JwtEnum } from '../enums/jwt-enum'
import { OneTimePasswordModule } from '../one-time-password/one-time-password.module'
@Module({
  imports: [
    UsersModule,
    OneTimePasswordModule,
    PassportModule,
    JwtModule.register({
      secret: JwtEnum.SECRET,
      signOptions: { expiresIn: '60d' },
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        host: configService.get<string>('database.redis.redisHost'),
        port: configService.get<number>('database.redis.redisPort'),
        ttl: configService.get<number>('database.redis.redisTtl'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
