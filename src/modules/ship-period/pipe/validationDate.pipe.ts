import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  PipeTransform,
} from '@nestjs/common'
import { LoggerService } from '../../logger/logger.service'
import { CreateShipPeriodDTO } from '../dto/createShipPeriod.dto'
import { isValid, isFuture, isToday } from 'date-fns'
import { ShipPeriodService } from '../ship-period.service'

@Injectable()
export class ValidationDatePipe implements PipeTransform<CreateShipPeriodDTO> {
  private readonly logger: LoggerService = new LoggerService(
    ValidationDatePipe.name,
  )
  constructor(private readonly shipPeriodService: ShipPeriodService) {}
  async transform(
    createShipPeriodDTO: CreateShipPeriodDTO,
    metadata: ArgumentMetadata,
  ): Promise<CreateShipPeriodDTO> {
    try {
      const endAt = createShipPeriodDTO.endAt
      if (!isValid(endAt)) {
        this.logger.error(`shipPeriod: endAt is invalid value`)
        throw new BadRequestException({
          message: 'endAt is invalid value',
        })
      }
      if (!isToday(endAt) && !isFuture(endAt)) {
        this.logger.error(`shipPeriod: endAt is invalid value`)
        throw new BadRequestException({
          message: 'endAt is invalid value',
        })
      }
      const shipPeriod = await this.shipPeriodService.shipPeriodFindByEndAt(
        endAt,
      )
      if (shipPeriod) {
        this.logger.error(`shipPeriod: this date is already`)
        throw new BadRequestException({
          message: 'this date is already',
        })
      }
      return createShipPeriodDTO
    } catch (error) {
      this.logger.error(
        `catch on getRanchCertificateById: ${error.message ?? error}`,
      )
      throw new InternalServerErrorException({
        message: error.message ?? error,
      })
    }
  }
}
