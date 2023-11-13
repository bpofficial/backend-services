import { AppConfigModule } from '@app/config';
import {
    RedisClientOptions,
    RedisModule as Rm,
} from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        Rm.forRootAsync({
            imports: [AppConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                    config: {
                        url: config.getOrThrow('redis.uri'),
                    } as RedisClientOptions,
                };
            },
        }),
    ],
    exports: [Rm],
})
export class RedisModule {}
