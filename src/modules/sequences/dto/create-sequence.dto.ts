import { ApiProperty } from '@nestjs/swagger'

export class CreateSequenceDto {
  @ApiProperty({
    example: '123456789',
  })
  key: string
  @ApiProperty({})
  value: number
}
