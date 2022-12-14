import { Injectable } from '@nestjs/common';
import {currencies, currenciesDocument} from "./currencies.shema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class CurrenciesService {
    @InjectModel(currencies.name) private deliveryProviders: Model<currenciesDocument>
}
