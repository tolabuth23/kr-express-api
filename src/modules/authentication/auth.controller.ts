import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
import { ApiProperty, ApiTags } from '@nestjs/swagger'
import { LoginDto } from './dto/login.dto'
import { LocalStrategy } from './local.strategy'
import { ValidationPipe } from './validator/validator.pip'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { LocalAuthGuard } from './local-auth.guard'

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}
  @Post('/authentication')
  @ApiProperty({
    type: LoginDto,
  })
  @UseGuards(LocalStrategy)
  async login(@Body(new ValidationPipe()) body: LoginDto) {
    return this.authService.login(body)
  }
  @Post('/users/sign-up')
  async createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    console.log(createUserDto)
    return await this.userService.createUser(createUserDto)
  }
}
