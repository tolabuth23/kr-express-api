import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Cache } from 'cache-manager'
import bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async validateUser(phoneNumber: string, pass: string): Promise<any> {
    const user = await this.userService.findByPhoneNumber(phoneNumber)
    if (!user) throw new BadRequestException('User does not exist')
    const passwordMatches = await bcrypt.compare(pass, user.password)
    if (!passwordMatches) throw new BadRequestException('Password is incorrect')
    const { password, ...result } = user
    return result
  }
  async login(userDto: any) {
    const user = await this.userService.findByPhoneNumber(userDto.phoneNumber)
    if (!user) throw new BadRequestException('User does not exist')
    const passwordMatches = await bcrypt.compare(
      userDto.password,
      user.password,
    )
    if (!passwordMatches) throw new BadRequestException('Password is incorrect')
    const tokens = await this.getTokens(
      user.objectId,
      user.phoneNumber,
      user.changedPassword,
    )
    await this.userService.updateUserToken(
      userDto.phoneNumber,
      tokens.accessToken,
    )
    return tokens
  }
  async getTokens(userId: string, username: string, changePass: boolean) {
    console.log(userId)
    const [accessToken, refreshToken, changePassword] = await Promise.all([
      this.jwtService.signAsync(
        {
          userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
      changePass,
    ])
    return {
      accessToken,
      refreshToken,
      changePassword,
    }
  }
}
