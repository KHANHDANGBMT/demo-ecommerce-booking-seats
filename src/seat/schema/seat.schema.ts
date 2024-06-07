import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { SeatEntity, SeatStatus, SeatType } from '../entities/seat.entity';

export type SeatDocument = HydratedDocument<Seat>;

@Schema()
export class Seat implements SeatEntity {
  @Prop({ type: 'Number', default: 10, min: 0, max: 10 })
  capacity: number;

  @Prop({ type: SchemaTypes.ObjectId })
  id: string;

  @Prop({ type: SchemaTypes.String })
  name: string;

  @Prop({ enum: SeatType, default: SeatType.SINGLE })
  type: SeatType;

  @Prop({ type: SchemaTypes.ObjectId })
  room_id: string;

  @Prop({ enum: SeatStatus, default: SeatStatus.NEW })
  status: SeatStatus;
}

export const SeatSchema = SchemaFactory.createForClass(Seat);
