import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
import { ApiProperty } from '@nestjs/swagger'
import { LoginDto } from './dto/login.dto'

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}
  @Post('auth/login')
  @ApiProperty({
    type: LoginDto,
  })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body)
  }
}
