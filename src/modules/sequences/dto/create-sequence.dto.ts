import { ApiProperty } from '@nestjs/swagger'

export class CreateSequenceDto {
  @ApiProperty({
    example: '403',
  })
  key: string
  @ApiProperty({
    example: 30,
  })
  value: number
}
