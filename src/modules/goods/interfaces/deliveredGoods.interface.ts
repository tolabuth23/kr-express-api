import { Currency } from '../../currency/currency.schema'
import { ImportRate } from '../../importRate/schemas/importRate.schema'
import { User } from '../../users/users.schema'


export class DeliveredGoodsInterface {
  trackingNumber: string

  user: User

  cod: number

  weight: number

  category: ImportRate

  currencyUnit: Currency

  destinationTrackingNumber: string

  trackingProvider: string

  deliveryCost: number
}