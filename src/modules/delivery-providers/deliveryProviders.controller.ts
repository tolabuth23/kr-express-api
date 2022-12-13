import { Controller, Get } from '@nestjs/common';
import { DeliveryProvidersService } from './deliveryProviders.service';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('delivery-providers')
@ApiTags('delivery-providers')
export class DeliveryProvidersController {
  constructor(private deliveryProvidersService: DeliveryProvidersService) {}
  @Get()
  getDeliveryProviders(req: Request, res: Response) {
    return this.deliveryProvidersService.getDeliveryProviders(req, res);
  }
}
