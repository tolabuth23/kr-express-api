import {
  Body,
  Controller,
  InternalServerErrorException,
  Logger,
  Post,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { ApiTags } from '@nestjs/swagger'
import { UsersService } from '../users/users.service'
import { CreateUserDto } from '../users/dto/create-user.dto'

@ApiTags('Public Authentication')
@Controller()
export class PublicAuthenticationController {
  constructor(private usersService: UsersService) {}
  private logger = new Logger(PublicAuthenticationController.name)
  @Post('/sign-up')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const { password } = createUserDto
      createUserDto.objectId = await this.usersService.getUserObjectId()
      createUserDto.password = await bcrypt.hash(password, 10)
      return await this.usersService.createUser(createUserDto)
    } catch (error) {
      this.logger.error(error?.message ?? JSON.stringify(error))
      throw new InternalServerErrorException({
        message: error.message ?? error,
      })
    }
  }
}
