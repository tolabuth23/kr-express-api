import {Types} from "mongoose";
import {Address, User} from "../../users/users.schema";
import {ApiProperty} from "@nestjs/swagger";
import {IsDate, IsDefined, IsEnum, IsMongoId, IsNumber, IsObject, IsOptional, IsString} from "class-validator";
import {Prop} from "@nestjs/mongoose";
import {ShipPeriod} from "../../ship-period/ship-period.schema";
import {deliveryStatus} from "../../enums/deliveryStatus.enum";
import {currencies} from "../../currencies/currencies.schema";
import {importRateValue} from "../../importRate/importRateValue.schema";
import {country} from "../../enums/country.enum";

export class GoodsDTO {
    @ApiProperty({

    })
    @IsString()
    @IsDefined()
    objectId: string;
    @ApiProperty({

    })
    @IsString()
    @IsOptional()
    @Prop({type: Types.ObjectId, ref: User})
    user?: User;
    @ApiProperty({

    })
    @IsString()
    @IsOptional()
    @Prop({type: Types.ObjectId, ref: ShipPeriod})
    shipPeriod?: ShipPeriod;
    @ApiProperty({

    })
    @IsString()
    @IsOptional()
    trackingNumber?: string;
    @ApiProperty({

    })
    @IsString()
    @IsOptional()
    qr: string;
    @ApiProperty({

    })
    @IsString()
    @IsOptional()
    @Prop({type: Types.ObjectId, ref: ShipPeriod})
    category: any ;
    @ApiProperty({
        description: 'description of the deliveryStatus property',
        enum: deliveryStatus
    })
    @IsEnum(deliveryStatus)
    status: deliveryStatus;
    @ApiProperty({

    })
    @IsNumber()
    weight?: number;
    @ApiProperty({

    })
    @IsNumber()
    cod?: number;
    @ApiProperty({

    })
    @IsNumber()
    @IsDefined()
    rate: number;
    @ApiProperty({

    })
    @IsString()
    @IsOptional()
    @Prop({type: Types.ObjectId, ref: currencies})
    currency?: object;
    @ApiProperty({

    })
    @IsOptional()
    @Prop({type: Types.ObjectId, ref: importRateValue})
    importRate?: importRateValue;
    @ApiProperty({

    })
    @IsNumber()
    @IsOptional()
    total?: number;
    @ApiProperty({
        enum:[null,country.JP]
    })
    @IsEnum([null,country.JP])
    @IsOptional()
    origin?: string;
    @IsOptional()
    @ApiProperty({

    })
    originArrivedAt?: Date;
    @IsEnum([null,country.TH])
    @IsOptional()
    @ApiProperty({
        enum:[null,country.TH]
    })
    destination?: string;
    @IsOptional()
    @ApiProperty({

    })
    destinationArrivedAt?: Date;
    @IsOptional()
    @ApiProperty({

    })
    deliveredAt: Date;
    @IsOptional()
    @ApiProperty({

    })
    weighedAt: Date;
    @IsObject()
    @IsOptional()
    @ApiProperty({

    })
    meta?: any;
    @IsObject()
    @IsOptional()
    @ApiProperty({

    })
    deliveryAddress?: Address;
    @IsObject()
    @IsOptional()
    @ApiProperty({

    })
    trackingProvider: Types.ObjectId;
    @IsString()
    @IsOptional()
    @ApiProperty({
        example: "11232314123"
    })
    destinationTrackingNumber: string;
    @IsDefined()
    @IsNumber()
    @ApiProperty({

    })
    deliveryCost: number;
}