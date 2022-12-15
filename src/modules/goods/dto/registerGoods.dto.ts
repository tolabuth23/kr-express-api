import {ShipPeriod} from "../../ship-period/ship-period.schema";
import {User} from "../../users/users.schema";
import {DeliveryAddressDTO} from "./deliveryAddress.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsDefined, IsNumber, IsString} from "class-validator";

export class RegisterGoodsDTO {
    @ApiProperty({

    })
    shipPeriod: ShipPeriod

    @IsString()
    @ApiProperty({

    })
    trackingNumber: string
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