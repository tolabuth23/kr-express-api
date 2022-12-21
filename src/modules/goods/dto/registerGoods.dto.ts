import {ShipPeriod} from "../../ship-period/ship-period.schema";
import {Address, User} from "../../users/users.schema";
import {DeliveryAddressDTO} from "./deliveryAddress.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsDefined, IsNumber, IsString} from "class-validator";

export class RegisterGoodsDTO {
    @IsString()
    @ApiProperty({

    })
    shipPeriod: string

    @IsString()
    @ApiProperty({

    })
    trackingNumber: string

    @IsString()
    @ApiProperty({

    })
    user: User

    @IsNumber()
    @ApiProperty({

    })
    cod: number

    @IsDefined()
    @ApiProperty({

    })
    deliveryAddress: DeliveryAddressDTO
}