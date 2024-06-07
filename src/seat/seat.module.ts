import { Module, forwardRef } from '@nestjs/common';
import { SeatService } from './seat.service';
import { SeatController } from './seat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Seat, SeatSchema } from './schema/seat.schema';
import { RedisModule } from 'src/redis/redis.module';
// import { RedisModule } from 'src/redis/redis.module';
// import { PublisherModule } from 'src/publisher/publisher.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seat.name, schema: SeatSchema }]),
    // PublisherModule,`
    forwardRef(() => RedisModule),
  ],
  controllers: [SeatController],
  providers: [SeatService],
  exports: [SeatService],
})
export class SeatModule {}
