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
import bcrypt from 'bcrypt'
import { ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/updateUser.dto'
import { User, UserDocument } from './users.schema'
import { RegisterValidationPipe } from '../authentication/pipes/register-validation.pipe'

@ApiTags('Users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private logger = new Logger(UsersController.name)

  @Post('users')
  async createUser(
    @Body(RegisterValidationPipe) createUserDto: CreateUserDto,
  ): Promise<User> {
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

  @Get('/users/:objectId')
  async getOneUser(@Param('objectId') objectId: string): Promise<UserDocument> {
    return this.usersService.getOneUser(objectId)
  }

  @Put('/users/:objectId/reset-password')
  async resetPasswordUser(@Param('objectId') objectId: string): Promise<any> {
    return await this.usersService.resetPasswordUser(objectId)
  }
}
