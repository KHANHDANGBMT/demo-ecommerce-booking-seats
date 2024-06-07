import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SeatService } from './seat.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { ApiTags } from '@nestjs/swagger';
import { RedisService } from 'src/redis/redis.service';

@ApiTags('Seat')
@Controller('seat')
export class SeatController {
  constructor(
    private readonly seatService: SeatService,
    private readonly redisService: RedisService,
  ) {}

  @Post()
  create(@Body() createSeatDto: CreateSeatDto) {
    return this.seatService.create(createSeatDto);
  }

  @Get()
  async findAll() {
    await this.redisService.publish('booking-seats', 'findAllSeat');
    return this.seatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seatService.findOne(id);
  }
}
