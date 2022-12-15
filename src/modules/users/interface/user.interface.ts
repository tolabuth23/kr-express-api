import { Document } from 'mongoose'
import { Address, Provider } from '../users.schema'
import { importRateValue } from '../../importRate/importRateValue.schema'

export interface User extends Document {
  email: string
  displayName: string
  addresses: [Address]
  objectId: string
  phoneNumber: string
  password: string
  latestLogin: Date
  status: string
  roles: string[]
  level: string
  token: string
  primaryGoodsType: importRateValue
  provider: Provider
  changedPassword: boolean
}
