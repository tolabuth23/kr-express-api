import {ShipPeriod} from "../../ship-period/ship-period.schema";
import {User} from "../../users/users.schema";
import {DeliveryAddressDTO} from "./deliveryAddress.dto";
import {ApiProperty} from "@nestjs/swagger";

export class InDestinationGoodsDTO {
    @ApiProperty({

    })
    trackingNumber: number
    @ApiProperty({

    })
    user: User
    @ApiProperty({

    })
    cod: number
    @ApiProperty({

    })
    deliveryAddress: DeliveryAddressDTO
}