import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RoomEntity } from '../entities/room.entity';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: true })
export class Room implements RoomEntity {
  id: string;

  @Prop({ isRequired: true, type: String })
  name: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
