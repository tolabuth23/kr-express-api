import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class CreateGoodsDTO {
    @IsNumber()
    @ApiProperty({
        example: "How many items do you want?"
    })
    amount: number
    @IsString()
    @ApiProperty({
        example : "UserObjectId"
    })
    user: string
}