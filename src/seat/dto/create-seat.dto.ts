import { ApiProperty } from '@nestjs/swagger';
import { SeatEntity, SeatStatus, SeatType } from '../entities/seat.entity';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateSeatDto implements SeatEntity {
  @IsOptional()
  @ApiProperty({ required: false, default: 10, type: Number })
  capacity: number;
  @IsOptional()
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @IsOptional()
  @IsEnum(SeatType)
  @ApiProperty({ enum: SeatType, required: false, default: SeatType.SINGLE })
  type: SeatType;

  @IsString()
  @ApiProperty({ type: String })
  room_id: string;

  @IsOptional()
  @IsEnum(SeatStatus)
  @ApiProperty({ enum: SeatStatus, required: false })
  status: SeatStatus;
}
