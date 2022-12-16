import {ApiProperty} from "@nestjs/swagger";
import {Prop, SchemaFactory , Schema} from "@nestjs/mongoose";
import * as shortid from 'shortid'
import { ImportRateValue } from "./importRateValue.schema";
import {Document} from "mongoose";
import {StatusEnum} from "../enum/status.enum";
import ValueImportRateInterface from "../interfaces/valueImportRate.interface";


export type importRateDocument = ImportRate & Document
@Schema({
    collection: 'import-rates',
    timestamps: true,
    versionKey: false,
})
export class ImportRate {
    @ApiProperty({})
    @Prop({
        type: String,
        required: true,
        index: true,
        unique: true,
        default: shortid.generate(),
    })
    objectId: string
    @ApiProperty({})
    @Prop({
        type: String,
        index: true,
        required: true,
    })
    name: string

    @ApiProperty({})
    @Prop({
        type: Object,
        default: {
            user: {
                type: [ImportRateValue],
                default: [],
            },
            dealer: {
                type: [ImportRateValue],
                default: [],
            },
        },
    })
    value: ValueImportRateInterface

    @ApiProperty({})
    @Prop({
        type: String,
        default: StatusEnum.ACTIVE,
    })
    status: string
}
export const importRateSchema =
    SchemaFactory.createForClass(ImportRate)