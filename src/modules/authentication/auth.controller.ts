import {
  Body,
  Controller,
  Post,
  Request,
  Logger,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
import {
  ApiBody,
  ApiCreatedResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger'
import { LoginDto } from './dto/login.dto'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { User } from '../users/users.schema'
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'
import { LocalAuthGuard } from './guards/local-auth.guard'

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private configService: ConfigService,
  ) {}
  private readonly logger = new Logger(AuthController.name)

  @Post('/authentication')
  @ApiBody({ type: LoginDto })
  @ApiProperty({
    type: LoginDto,
  })
  @Post('auth/login')
  async login(@Body() body: LoginDto) {
    console.log('Authentication')
    return this.authService.login(body)
  }

  @Post('/users/sign-up')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password } = createUserDto
      const hashedPassword = await bcrypt.hash(password, 10)
      return this.userService.createUser({
        ...createUserDto,
        password: hashedPassword,
      })
    } catch (error) {
      this.logger.error(error?.message ?? JSON.stringify(error))
      throw new InternalServerErrorException({
        message: error.message ?? error,
      })
    }
  }
}
