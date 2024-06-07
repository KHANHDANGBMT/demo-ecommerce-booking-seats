import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { SeatModule } from 'src/seat/seat.module';

@Module({
  imports: [SeatModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
