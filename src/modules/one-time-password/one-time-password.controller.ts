import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { OneTimePasswordService } from './one-time-password.service'
import CreateOptDto from './dto/create-opt-dto'
import { OneTimePassword } from './one-time-password.schema'
import { DeleteByPhoneNumberDto } from './dto/delete-by-phone-number.dto'

@Controller('One-Time-Password')
export class OneTimePasswordController {
  constructor(private otpService: OneTimePasswordService) {}
  @Delete()
  async deleteByPhoneNumber(@Body() createOptDto: CreateOptDto) {
    return this.otpService.deleteByPhoneNumber(createOptDto)
  }

  @Get('ref')
  async getByRef(@Param('ref') ref: string) {
    return this.otpService.getByRef(ref)
  }

  @Put('ref')
  async verify(@Param('ref') ref: string) {
    return this.otpService.verify(ref)
  }
}
