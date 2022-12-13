import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import shortid from 'shortid';
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  collection: 'currencies',
  timestamps: true,
  versionKey: false,
})
export class currencies {
  @ApiProperty({
    type: String,
  })
  @Prop({
    type: String,
    required: true,
    index: true,
    unique: true,
    default: shortid.generator,
  })
  objectId: string;

  @ApiProperty({
    type: String,
  })
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @ApiProperty({
    type: String,
  })
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  currencyUnit: string;

  @ApiProperty({
    type: Number,
  })
  @Prop({
    type: Number,
    required: true,
  })
  value: number;
}

export const currenciesSchema = SchemaFactory.createForClass(currencies);
