import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'

import * as bcrypt from 'bcrypt'
import { ApiTags } from '@nestjs/swagger'
import { UpdateUserDto } from './dto/updateUser.dto'
import { User } from './users.schema'

@ApiTags('Users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private logger = new Logger(UsersController.name)
  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const { password } = createUserDto
      createUserDto.objectId = await this.usersService.getUserObjectId()
      createUserDto.password = await bcrypt.hash(password, 10)
      console.log('Create User Dto: ', createUserDto)
      return await this.usersService.createUser(createUserDto)
    } catch (error) {
      this.logger.error(error?.message ?? JSON.stringify(error))
      throw new InternalServerErrorException({
        message: error.message ?? error,
      })
    }
  }

  @Put('/users/:objectId')
  async updateUser(
    @Body()
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    try {
      const { objectId } = updateUserDto
      return this.usersService.updateUser(objectId, updateUserDto)
    } catch (error) {
      this.logger.error(error?.message ?? JSON.stringify(error))
      throw new InternalServerErrorException({
        message: error.message ?? error,
      })
    }
  }

  @Get('/users')
  async getListUsers(): Promise<User> {
    return this.usersService.getListUsers()
  }
}
