import {
  Body,
  Controller,
  InternalServerErrorException,
  Logger,
  Post,
} from '@nestjs/common'
import bcrypt from 'bcrypt'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger'
import { LoginDto } from './dto/login.dto'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { User } from '../users/users.schema'
import { RegisterValidationPipe } from './pipes/register-validation.pipe'

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}
  private readonly logger = new Logger(AuthController.name)
  @Post('/authentication')
  @ApiBody({ type: LoginDto })
  @ApiProperty({
    type: LoginDto,
  })
  @Post('auth/login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body)
  }
  @Post('/users/sign-up')
  async createUser(
    @Body(RegisterValidationPipe) createUserDto: CreateUserDto,
  ): Promise<User> {
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
