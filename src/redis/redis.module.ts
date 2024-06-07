import { Module, Global, forwardRef } from '@nestjs/common';
import { RedisService } from './redis.service';
import { SeatModule } from 'src/seat/seat.module';

@Global()
@Module({
  imports: [forwardRef(() => SeatModule)],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
