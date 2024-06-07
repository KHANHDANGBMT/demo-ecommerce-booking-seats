import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './schema/room.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Seat } from 'src/seat/schema/seat.schema';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  create(createRoomDto: CreateRoomDto) {
    return this.roomModel.create(createRoomDto);
  }

  findAll() {
    return this.roomModel.find().lean();
  }

  async findOne(id: string) {
    console.log('🚀 ~ RoomService ~ findOne ~ id:', id);
    const result = await this.roomModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'seats', // name of the Seat collection in MongoDB
          localField: '_id',
          foreignField: 'room_id',
          as: 'seats',
        },
      },
    ]);
    console.log(result);
    return result;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
