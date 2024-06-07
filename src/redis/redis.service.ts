import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Inject,
  forwardRef,
} from '@nestjs/common';
import Redis from 'ioredis';
import { SeatService } from 'src/seat/seat.service';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private publisher: Redis;
  private subscriber: Redis;
  private cache: Redis;

  constructor(
    @Inject(forwardRef(() => SeatService))
    private readonly seatService: SeatService,
  ) {}

  async publish(channel: string, message: string): Promise<void> {
    await this.publisher.publish(channel, message);
  }

  onModuleInit() {
    this.publisher = new Redis({
      password: process.env.REDIS_PASSWORD || 'secret_password',
    });

    this.subscriber = new Redis({
      password: process.env.REDIS_PASSWORD || 'secret_password',
    });

    this.cache = new Redis({
      password: process.env.REDIS_PASSWORD || 'secret_password',
    });

    this.subscriber.subscribe('booking-seats', (err, count) => {
      if (err) {
        console.error('Failed to subscribe: %s', err.message);
      } else {
        console.log(
          `Subscribed successfully! This client is currently subscribed to ${count} channels.`,
        );
      }
    });

    this.subscriber.on('message', async (channel, message) => {
      if (channel === 'booking-seats') {
        const data: { roomId: string; seatId: string } = JSON.parse(message);
        const result = await this.seatService.bookingSeatNormalWay(
          data.roomId,
          data.seatId,
        );
        console.log('🚀 ~ RedisService ~ this.subscriber.on ~ result:', result);
      }
    });
  }

  async setnx(key: string, value: string) {
    return await this.cache.setnx(key, value);
  }

  async set(key: string, value: string) {
    return await this.cache.set(key, value);
  }

  async increby(key: string) {
    return await this.cache.incrby(key, 1);
  }

  async get(key: string) {
    return await this.cache.get(key);
  }

  getPublisher(): Redis {
    return this.publisher;
  }

  getSubscriber(): Redis {
    return this.subscriber;
  }

  onModuleDestroy() {
    this.publisher.disconnect();
    this.subscriber.disconnect();
  }
}
