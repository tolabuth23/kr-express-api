import {Types} from "mongoose";
import {Address, User} from "../../users/users.schema";
import {ApiProperty} from "@nestjs/swagger";
import {IsDefined, IsEnum, IsMongoId, IsNumber, IsOptional, IsString} from "class-validator";
import {Prop} from "@nestjs/mongoose";
import {ShipPeriod} from "../../ship-period/ship-period.schema";
import {deliveryStatus} from "../../enums/deliveryStatus.enum";
import {currencies} from "../../currencies/currencies.schema";
import {importRateValue} from "../../importRate/importRateValue.schema";

export class GoodsDto{
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
    @Prop({type: Types.ObjectId, ref: currencies})
    currency?: object;
    @ApiProperty({

    })
    @IsString()
    @Prop({type: Types.ObjectId, ref: importRateValue})
    importRate?: importRateValue;
    @ApiProperty({

    })
    @IsNumber()
    total?: number;
    @ApiProperty({

    })

    origin: string;
    @ApiProperty({

    })

    originArrivedAt: Date;
    @ApiProperty({

    })

    destination: string;
    @ApiProperty({

    })

    destinationArrivedAt: Date;
    @ApiProperty({

    })

    deliveredAt: Date;
    @ApiProperty({

    })

    weighedAt: Date;
    @ApiProperty({

    })
    meta: any;
    @ApiProperty({

    })
    deliveryAddress: Address;
    @ApiProperty({

    })

    trackingProvider: Types.ObjectId;
    @ApiProperty({

    })

    destinationTrackingNumber: string;
    @ApiProperty({

    })
    deliveryCost: string;
}