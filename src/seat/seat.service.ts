import { Injectable } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { Seat } from './schema/seat.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class SeatService {
  constructor(
    @InjectModel(Seat.name) private seatModel: Model<Seat>,
    private readonly redisService: RedisService,
  ) {}

  create(createSeatDto: CreateSeatDto) {
    return this.seatModel.create(createSeatDto);
  }

  findAll() {
    return this.seatModel.find();
  }

  findOne(id: string) {
    return this.seatModel.findOne(new mongoose.Types.ObjectId(id));
  }

  async bookingSeat(roomId: string, seatId: string) {
    let roomIdObj, seatIdObj;
    try {
      roomIdObj = new mongoose.Types.ObjectId(roomId);
      seatIdObj = new mongoose.Types.ObjectId(seatId);
    } catch (e) {
      console.log('Error');
      return;
    }

    // atomics function following docs: https://mongoosejs.com/docs/tutorials/findoneandupdate.html#:~:text=%3B%20//%2059-,Atomic%20Updates,-With%20the%20exception
    const seatBooking = await this.seatModel
      .findOneAndUpdate(
        {
          _id: seatIdObj,
          room_id: roomIdObj,
          $expr: { $lt: ['$capacity', 10] },
        },
        {
          $inc: { capacity: 1 },
        },
        { new: true },
      )
      .lean();

    if (seatBooking && seatBooking.capacity <= 10) {
      console.log('Booked Seat Number: ', seatBooking.capacity);
    } else {
      console.log('Seat already full');
    }

    return seatBooking;
  }

  async redisBookingSeat(roomId: string, seatId: string) {
    const seatInfo = await this.redisService.get(roomId + seatId);

    if (!+seatInfo) {
      const seatCapacity = await this.seatModel
        .findOne({
          _id: new mongoose.Types.ObjectId(seatId),
          room_id: new mongoose.Types.ObjectId(roomId),
        })
        .lean();
      await this.redisService.set(roomId + seatId, seatCapacity.capacity + '');
    }

    const seatCapacity = await this.redisService.increby(roomId + seatId);
    if (+seatCapacity <= 10) {
      console.log('Booked Seat Number: ', seatCapacity);
      await this.redisService.publish(
        'booking-seats',
        JSON.stringify({ roomId, seatId }),
      );
    } else {
      console.log('Seat already full');
      return;
    }
  }

  async bookingSeatNormalWay(roomId: string, seatId: string) {
    return await this.seatModel.updateOne(
      {
        _id: new mongoose.Types.ObjectId(seatId),
        room_id: new mongoose.Types.ObjectId(roomId),
        $expr: { $lt: ['$capacity', 10] },
      },
      {
        $inc: { capacity: 1 },
      },
    );
  }
}
