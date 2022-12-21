import { Type } from 'class-transformer'
import { IsDate, IsDefined } from 'class-validator'

export class CreateShipPeriodDTO {
  @IsDefined()
  @IsDate()
  @Type(() => Date)
  endAt: Date
}
