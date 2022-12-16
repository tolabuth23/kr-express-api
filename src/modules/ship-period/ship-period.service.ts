import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {ShipPeriod, shipPeriodDocument} from "./ship-period.schema";
import {Model} from "mongoose";

@Injectable()
export class ShipPeriodService {
    constructor(@InjectModel(ShipPeriod.name) private readonly shipPeriodModel:Model<shipPeriodDocument>) {
    }
    shipPeriodCreate(){

    }
}
