import {ApiProperty} from "@nestjs/swagger";
import {Prop, Schema} from "@nestjs/mongoose";
import {nanoid} from "nanoid";
import {SchemaTypes, Types} from "mongoose";
import {deliveryStatus} from "../../enums/deliveryStatus.enum";
import {ImportRateValue} from "../../importRate/schemas/importRateValue.schema";
import {country} from "../../enums/country.enum";
import {Address} from "../../users/users.schema";

export interface GoodsInterface {

    objectId: string;

    user: Types.ObjectId;

    shipPeriod: Types.ObjectId;

    trackingNumber: string;

    qr: string;

    category: Types.ObjectId;

    status: Types.ObjectId;

    weight: number;

    cod: number;

    rate: number;

    currency: object;

    importRate: object;

    total: number;

    origin: string;

    originArrivedAt: Date;

    destination: string;

    destinationArrivedAt: Date;

    deliveredAt: Date;

    weighedAt: Date;
    meta: any;
    deliveryAddress: Address;

    trackingProvider: Types.ObjectId;

    destinationTrackingNumber: string;

    deliveryCost: string;
}