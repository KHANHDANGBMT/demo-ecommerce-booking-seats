import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class BookSeats {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'room id' })
  roomId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'seats id' })
  seatId: string;
}
