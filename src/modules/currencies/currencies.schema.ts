import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({
    collection: 'currencies',
    timestamps: true,
    versionKey: false,
})
export class currencies {
    @ApiProperty({
        type: String,
    })
    @Prop({
        type: String,
        required: true,
        index: true,
        unique: true,
        default: null,
    })
    objectId: string;

    @ApiProperty({
        type: String,
    })
    @Prop({
        type: String,
        required: true,
    })
    title: string;

    @ApiProperty({
        type: String,
    })
    @Prop({
        type: String,
        required: true,
        unique: true,
    })
    currencyUnit: string;

    @ApiProperty({
        type: Number,
    })
    @Prop({
        type: Number,
        required: true,
    })
    value: number;
}
export type currenciesDocument = currencies & Document
export const currenciesSchema = SchemaFactory.createForClass(currencies);