import {deliveryStatus} from '../enums/deliveryStatus.enum'
import {country} from '../enums/country.enum'
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document, SchemaTypes, Types} from 'mongoose'
import {Address, User} from '../users/users.schema'
import shortid from 'shortid'
import {DeliveryAddressDTO} from "./dto/deliveryAddress.dto";
import {Currency} from "../currency/currency.schema";
import {ImportRate} from "../importRate/schemas/importRate.schema";
import {IImportRate} from "../utils/Currency/Interfaces/currencyIImportRate.interface";

export type GoodsDocument = Goods & Document

@Schema({
    collection: 'goods',
    timestamps: true,
    versionKey: false,
})
export class Goods {
    @Prop({
        type: String,
        required: true,
        index: true,
        unique: true,
        default: shortid.generate(),
    })
    objectId: string

    @Prop({
        type: SchemaTypes.ObjectId,
        ref: User.name,
        index: true,
        default: null,
    })
    user: User

    @Prop({
        type: SchemaTypes.ObjectId,
        ref: 'ship-periods',
        index: true,
        default: null,
    })
    shipPeriod: Types.ObjectId

    @Prop({
        type: String,
        index: true,
        default: null,
    })
    trackingNumber: string

    @Prop({
        type: String,
        required: true,
    })
    qr: string

    @Prop({
        type: SchemaTypes.ObjectId,
        ref: ImportRate.name,
        index: true,
        default: null,
    })
    category: ImportRate

    @Prop({
        enum: deliveryStatus,
        default: deliveryStatus.CREATED,
    })
    status: string

    @Prop({
        type: Number,
        default: null,
    })
    weight: number

    @Prop({
        type: Number,
        default: 0,
    })
    cod: number

    @Prop({
        type: Number,
        required: true,
        default: 0,
    })
    rate: number

    @Prop({
        type: Object,
        default: null,
    })
    currency: Currency

    @Prop({
        type: Object,
        default: null,
    })
    importRate: IImportRate

    @Prop({
        type: Number,
        default: 0,
    })
    total: number

    @Prop({
        type: String,
        eum: [null, country.JP],
        default: null,
    })
    origin: string

    @Prop({
        type: Date,
        default: null,
    })
    originArrivedAt: Date

    @Prop({
        type: String,
        enum: [null, country.TH],
        default: null,
    })
    destination?: string

    @Prop({
        type: Date,
        default: null,
    })
    destinationArrivedAt: Date

    @Prop({
        type: Date,
        default: null,
    })
    deliveredAt: Date

    @Prop({
        type: Date,
        default: null,
    })
    weighedAt: Date

    @Prop({
        type: SchemaTypes.Mixed,
        default: {},
    })
    meta: any

    @Prop({
        type: Address,
        default: null,
    })
    deliveryAddress: DeliveryAddressDTO

    @Prop({
        type: SchemaTypes.ObjectId,
        ref: 'delivery-provider',
        index: true,
        default: null,
    })
    trackingProvider: Types.ObjectId

    @Prop({
        type: String,
        default: null,
    })
    destinationTrackingNumber: string

    @Prop({
        type: Number,
        default: null,
    })
    deliveryCost: number
}

export const goodsSchema = SchemaFactory.createForClass(Goods)
