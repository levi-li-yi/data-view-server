/*
 * @Author: Levi Li
 * @Date: 2024-02-20 17:11:25
 * @description:  缓存服务
 */
import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class CacheService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  /** 获取缓存 */
  async getCache(key): Promise<any> {
    const data = await this.redis.get(key);
    return {
      cacheName: key.substring(0, key.lastIndexOf(':')),
      cacheKey: key.substring(key.lastIndexOf(':')),
      cacheValue: data,
    };
  }

  getCacheKeys(pattern: string) {
    return this.redis.keys(pattern);
  }

  deleteCache(cacheKey) {
    return this.redis.del(cacheKey);
  }
}
