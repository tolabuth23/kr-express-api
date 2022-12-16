import {Controller, Get, Res} from '@nestjs/common';
import { DeliveryProvidersService } from './deliveryProviders.service';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('delivery-providers')
@ApiTags('deliveryProviders')
export class DeliveryProvidersController {
  constructor(private deliveryProvidersService: DeliveryProvidersService) {}
  @Get()
  getDeliveryProviders(req: Request,@Res() res: Response) {
    return this.deliveryProvidersService.getDeliveryProviders(req, res);
  }
}
