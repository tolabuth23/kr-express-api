import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Currency, CurrencyDocument } from "./currency.schema";

@Injectable()
export class CurrencyService {
  @InjectModel(Currency.name) private currenciesModel: Model<CurrencyDocument>;
}