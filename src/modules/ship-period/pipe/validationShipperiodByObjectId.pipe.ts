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
import { ShipPeriodService } from '../ship-period.service'
import { ShipPeriod, shipPeriodDocument } from '../ship-period.schema'
import { WAITING_TO_RECEIVE } from '../../../constants'
import { ShipPeriodInterface } from '../interface/shipPeriod.interface'

@Injectable()
export class ValidationShipperByObjectIdPipe implements PipeTransform<string> {
  private readonly logger: LoggerService = new LoggerService(
    ValidationShipperByObjectIdPipe.name,
  )
  constructor(private readonly shipPeriodService: ShipPeriodService) {}
  async transform(objectId: string, metadata: ArgumentMetadata): Promise<shipPeriodDocument> {
    let shipPeriod: shipPeriodDocument
    try{
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
      return shipPeriod
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
