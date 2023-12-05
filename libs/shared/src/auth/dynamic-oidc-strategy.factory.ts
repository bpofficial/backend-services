import { ConnectionServiceProvider } from '@app/clients';
import { Injectable } from '@nestjs/common';
import { StrategyService } from './strategy.service';
import { Redis } from 'ioredis';
import { InjectRedis, RedisService } from '@liaoliaots/nestjs-redis';
import { Connection } from '@app/proto/connection';

@Injectable()
export class DynamicOidcStrategyFactory {
    private readonly redis: Redis;

    constructor(
        @InjectRedis() private readonly redisServiceProvider: RedisService,
        private readonly connectionServiceProvider: ConnectionServiceProvider,
        private readonly strategyService: StrategyService,
    ) {
        this.redis = this.redisServiceProvider.getClient();
    }

    async createStrategy(cid: string) {
        const cachedConnection = await this.redis.get(`connection:${cid}`);

        if (cachedConnection) {
            return this.strategyService.getStrategy(
                Connection.fromJSON(JSON.parse(cachedConnection)),
            );
        }

        const { connection, error } = await this.connectionServiceProvider
            .getService()
            .GetConnection({ cid });

        if (error || !connection) {
            throw new Error('Failed to retrieve connection details');
        }

        await this.redis.set(`connection:${cid}`, JSON.stringify(connection));
        return this.strategyService.getStrategy(connection);
    }
}
