import { ShipPeriodStatusEnums } from '../../enums/shipPeriodStatus.enums'
import { Prop } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import shortid from 'shortid'

export interface ShipPeriodInterface {
  _id: string
  objectId: string
  endAt: Date
  status: string
  runningNumber: number
}
