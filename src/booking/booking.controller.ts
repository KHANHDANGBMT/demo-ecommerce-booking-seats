import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookSeats } from './dto/book-seats';
import { SeatService } from 'src/seat/seat.service';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly seatService: SeatService,
  ) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Post('/seat')
  @ApiOperation({ summary: 'booking seats' })
  bookingSeats(@Body() bookingDto: BookSeats) {
    return this.seatService.bookingSeat(bookingDto.roomId, bookingDto.seatId);
  }

  @Post()
  book(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Get('/test-bookings')
  bookWithDefaultId() {
    console.log(new Date().getTime());
    return this.seatService.bookingSeat(
      '6661845a03287bfeae8126c2',
      '6662be7ed1a7698ac069c0c3',
    );
  }

  @Get('/test-bookings-redis')
  bookWithRedis() {
    console.log(new Date().getTime());
    return this.seatService.redisBookingSeat(
      '6661845a03287bfeae8126c2',
      '6662be7ed1a7698ac069c0c3',
    );
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
