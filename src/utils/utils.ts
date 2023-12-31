import { Injectable } from '@nestjs/common';
import * as redis from 'redis';
import { ConfigService } from '@nestjs/config';
import { RedisService } from 'src/modules/redis/redis.service';

@Injectable()
export class Utils {
  private readonly redisClient: redis.RedisClientType;

  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async redisSetValue(key: string, value: string): Promise<void> {
    const redisClient = this.redisService.getRedisClient();
    await redisClient.set(key, value);
  }

  async redisSetValueDuration(
    key: string,
    value: string,
    duration: number,
  ): Promise<void> {
    const redisClient = this.redisService.getRedisClient();
    const exists = await redisClient.exists(key);
    if (!exists) {
      await redisClient.setex(key, duration, value);
    }
  }

  async redisGetValue(key: string): Promise<string | null> {
    const redisClient = this.redisService.getRedisClient();
    return await redisClient.get(key);
  }

  redisRemoveValue(key: string) {
    const redisClient = this.redisService.getRedisClient();
    redisClient.del(key);
  }

  redisCloseConnection() {
    this.redisService.closeRedisClient();
  }

  async checkPasswordVerificationStatus(phone: string): Promise<any> {
    const key = `${phone}-loginOtpPasswordVerified`;
    const otpRedisValue = await this.redisGetValue(key);
    if (otpRedisValue) {
      this.redisRemoveValue(key);
      return otpRedisValue === '1';
    }
    return false;
  }

  async saveUserDetailsRedis(user: any, userId: number) {
    const key = `user_${userId}`;
    const userData = await this.redisSetValue(key, JSON.stringify(user));
    return userData;
  }

  async getUserDetailsRedis(userId: number) {
    const key = `user_${userId}`;
    const user = await this.redisGetValue(key);
    return JSON.parse(user);
  }

  async removeUserDetailsRedis(userId: number) {
    const key = `user_${userId}`;
    const user = await this.redisRemoveValue(key);
    return user;
  }
}
