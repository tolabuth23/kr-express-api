import {
  BadRequestException,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
import { UsersService } from '../../users/users.service'
import { UpdateUserDto } from '../dto/update-user.dto'
@Injectable()
export class ValidateUpdateUserPipes implements PipeTransform {
  @Inject() private readonly usersService: UsersService
  async transform(body: UpdateUserDto): Promise<UpdateUserDto> {
    const user = await this.usersService.findByPhoneNumber(body.phoneNumber)
    if (user) {
      if (user.phoneNumber === body.phoneNumber) {
        throw new BadRequestException('phone number is already to use')
      }
    }
    return body
  }
}
