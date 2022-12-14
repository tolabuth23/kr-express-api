import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  collection: 'deliveryProviders',
  timestamps: true,
  versionKey: false,
})
export class deliveryProviders {
  @ApiProperty({})
  @Prop({
    type: String,
    required: true,
    index: true,
    unique: true,
    default: null,
  })
  objectId: string;
  @ApiProperty({})
  @Prop({
    type: String,
    required: true,
  })
  title: string;
  @ApiProperty({})
  @Prop({
    type: Boolean,
    default: true,
  })
  requiredTrackingId: string;
}

export const deliveryProvidersSchema =
  SchemaFactory.createForClass(deliveryProviders);
