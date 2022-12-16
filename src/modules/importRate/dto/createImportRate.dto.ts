import {IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateImportRateDTO{
    @ApiProperty({
        example: "name"
    })
    @IsString()
    typeName: string

    @ApiProperty({
        example: "Rate At 0"
    })
    @IsNumber()
    w0 : number

    @ApiProperty({
        example: "Rate At 1"
    })
    @IsNumber()
    w1 : number

    @ApiProperty({
        example: "Rate At 2"
    })
    @IsNumber()
    w2 : number

    @ApiProperty({
        example: "Rate At 3"
    })
    @IsNumber()
    w3 : number

}