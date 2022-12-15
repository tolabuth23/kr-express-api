import {
  CACHE_MANAGER,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { Cache } from 'cache-manager'
import { bcrypt } from 'bcrypt'
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async validateUser(phoneNumber: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(phoneNumber)
    if (user && user.password === pass) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId }
    return this.createTokens(payload)
  }

  async createTokens(payload) {
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '60d',
      }),
      changedPassword: 'false',
    }
  }
}
