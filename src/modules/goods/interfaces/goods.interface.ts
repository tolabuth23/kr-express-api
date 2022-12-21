import { Currency } from '../../currency/currency.schema'
import { ImportRate } from '../../importRate/schemas/importRate.schema'
import { ShipPeriod } from '../../ship-period/ship-period.schema'
import { User } from '../../users/interface/user.interface'
import { DeliveryAddressDTO } from '../dto/deliveryAddress.dto'
import { SchemaTypes, Types } from 'mongoose'

export interface GoodsInterface {
  objectId: string
  user: User
  shipPeriod?: ShipPeriod
  trackingNumber?: string
  qr: string
  category?: ImportRate
  status?: Types.ObjectId
  weight?: number
  cod?: number
  rate?: number
  currency?: Currency
  importRate?: ImportRate
  total?: number
  origin?: string
  originArrivedAt?: Date
  destination?: string
  destinationArrivedAt?: Date
  deliveredAt?: Date
  weighedAt?: Date
  meta?: any
  deliveryAddress?: DeliveryAddressDTO
  trackingProvider?: Types.ObjectId
  destinationTrackingNumber?: string
  deliveryCost?: string
}
