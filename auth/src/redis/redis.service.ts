import { ConfigService } from '@nestjs/config';
import { Redis } from '@upstash/redis';

export class RedisService {
    private readonly redis: Redis;

    constructor(private readonly configService: ConfigService) {
        this.redis = new Redis({
            url: configService.get('REDIS_URL'),
            token: configService.get('REDIS_TOKEN'),
        });
    }
    public getRedis() {
        return this.redis;
    }

    async set<T>(key: string, value: T) {
        return await this.redis.set(key, value);
    }

    async get<T>(key: string): Promise<T | null> {
        return await this.redis.get(key);
    }

    async delete(key: string) {
        return await this.redis.del(key);
    }
}
