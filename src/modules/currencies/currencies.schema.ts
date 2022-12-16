import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as shortid from "shortid";

@Schema({
    collection: 'currencies',
    timestamps: true,
    versionKey: false,
})
export class Currencies {
    @Prop({
        type: String,
        required: true,
        index: true,
        unique: true,
        default: shortid.generate(),
    })
    objectId: string;

    @Prop({
        type: String,
        required: true,
    })
    title: string;

    @Prop({
        type: String,
        required: true,
        unique: true,
    })
    currencyUnit: string;

    @Prop({
        type: Number,
        required: true,
    })
    value: number;
}
export type currenciesDocument = Currencies & Document
export const currenciesSchema = SchemaFactory.createForClass(Currencies);