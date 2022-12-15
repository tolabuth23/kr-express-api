import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class CreateGoodsDTO {
    @IsString()
    @ApiProperty({
        example : "arisak"
    })
    user: string
    @IsNumber()
    @ApiProperty({
        example: "How many items do you want?"
    })
    amount: number
}