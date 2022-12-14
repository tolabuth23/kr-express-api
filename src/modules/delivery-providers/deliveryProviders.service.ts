import { Injectable } from '@nestjs/common'
import { Request, Response } from 'express'
@Injectable()
export class DeliveryProvidersService {
  async getDeliveryProviders(req: Request, res: Response) {
    const { s = '', page = 1 } = req.query
    return
  }
}
