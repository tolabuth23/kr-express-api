import { Currency } from '../../currency/currency.schema'
import { ImportRate } from '../../importRate/schemas/importRate.schema'
import { User } from '../../users/users.schema'
import { DeliveryAddressDTO } from '../dto/deliveryAddress.dto'

export interface InDestinationInterface {
  trackingNumber: string
  user?: User
  weight: number
  category: ImportRate
  currency: Currency
  cod: number
  rate: number
  deliveryAddress: DeliveryAddressDTO
}
