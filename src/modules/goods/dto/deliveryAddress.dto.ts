import {ApiProperty} from "@nestjs/swagger";
import {IsDefined, IsString} from "class-validator";

export class DeliveryAddressDTO {
    @IsString()
    @ApiProperty({

    })
    'deliveryAddress': string

    @IsString()
    @ApiProperty({

    })
    'deliveryAddress._id': string

    @IsString()
    @ApiProperty({

    })
    'deliveryAddress.name': string

    @IsString()
    @ApiProperty({

    })
    'deliveryAddress.phone': string

    @IsString()
    @ApiProperty({

    })
    'deliveryAddress.province': string

    @IsString()
    @ApiProperty({

    })
    'deliveryAddress.district': string

    @IsString()
    @ApiProperty({

    })
    'deliveryAddress.postCode': string

    @IsString()
    @ApiProperty({

    })
    'deliveryAddress.description': string

    @IsString()
    @ApiProperty({

    })
    'deliveryAddress.location': string

}