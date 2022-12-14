import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Sequence {
  @Prop({
    type: String,
    index: true,
    required: true,
  })
  key: string

  @Prop({
    type: Number,
    default: 0,
  })
  value: number
}

export const SequenceSchema = SchemaFactory.createForClass(Sequence)
