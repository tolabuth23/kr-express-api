import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { PublicService } from './public.service'
import { User } from '../users/users.schema'
import { UserChangePasswordDto } from './dto/user-change-password'
@ApiTags('Public')
@Controller('me')
export class PublicController {
  constructor(private publicService: PublicService) {}
  @Get()
  async getMe(@Param('id') id: string): Promise<User> {
    return this.publicService.getMe(id)
  }
  @Get('/categories')
  async getCategories(): Promise<any> {
    return this.publicService.getCategories()
  }
  @Put('/change-password')
  async userChangePassword(@Body() userChangePassword: UserChangePasswordDto) {
    return this.publicService.userChangePassword(userChangePassword)
  }
}
