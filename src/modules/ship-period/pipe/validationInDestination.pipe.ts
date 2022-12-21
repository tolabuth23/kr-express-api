import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  PipeTransform,
} from '@nestjs/common'
import { LoggerService } from '../../logger/logger.service'
import { ShipPeriodService } from '../ship-period.service'
import { WAITING_TO_RECEIVE } from '../../../constants'

@Injectable()
export class ValidationInDestinationPipe implements PipeTransform<string> {
  private readonly logger: LoggerService = new LoggerService(
    ValidationInDestinationPipe.name,
  )
  constructor(private readonly shipPeriodService: ShipPeriodService) {}
  async transform(objectId: string, metadata: ArgumentMetadata): Promise<any> {
    let shipPeriod: any
    try {
      shipPeriod =
        await this.shipPeriodService.findShipPeriodByObjectIdAndStatus(
          objectId,
          WAITING_TO_RECEIVE,
        )
      if (!shipPeriod) {
        this.logger.error(`shipPeriod: ship period ${objectId} not found`)
        throw new BadRequestException({
          message: 'ship period not found',
        })
      }
    } catch (error) {
      this.logger.error(
        `catch on getRanchCertificateById: ${error.message ?? error}`,
      )
      throw new InternalServerErrorException({
        message: error.message ?? error,
      })
    }
    return shipPeriod
  }
}
