import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RoomEntity } from '../entities/room.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto implements RoomEntity {
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'room name' })
  name: string;
}
