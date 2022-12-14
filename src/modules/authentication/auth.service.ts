import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email)
    const isMatch = await bcrypt.compare(pass, user.password)
    console.log('Check password: ', isMatch)
    if (user && isMatch) {
      const { password, ...result } = user
      return result
    }
    return null
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user._id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
