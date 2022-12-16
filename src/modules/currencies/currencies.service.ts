import { Injectable } from '@nestjs/common';
import {Currencies, currenciesDocument} from "./currencies.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class CurrenciesService {
    @InjectModel(Currencies.name) private currenciesModel: Model<currenciesDocument>
}
