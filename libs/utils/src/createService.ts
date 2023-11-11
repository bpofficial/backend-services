import { AppConfigModule } from '@app/config';
import { INestApplication, INestMicroservice, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import ConnectRedis from 'connect-redis';
import cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as redis from 'redis';

const logger = new Logger();

export async function createService(
    service: `service.${string}`,
    module: any,
): Promise<[INestMicroservice, INestApplication, any]> {
    logger.log(`Creating service ${service.split('.')[1]}`, 'CreateService');
    const configApp = await NestFactory.createApplicationContext(
        AppConfigModule,
        {
            logger: ['error', 'fatal'],
        },
    );

    const configService = configApp.get(ConfigService);

    const microservice =
        await NestFactory.createMicroservice<MicroserviceOptions>(module, {
            logger: ['debug', 'log', 'warn', 'error', 'fatal'],
            transport: Transport.GRPC,
            options: {
                package: configService.getOrThrow(`${service}.package`),
                protoPath: configService.getOrThrow(`${service}.proto`),
                url: configService.getOrThrow(`${service}.url`),
            },
        });

    // Create a Redis client
    const redisClient = redis.createClient({
        ...configService.getOrThrow('common.redis'),
    });

    const sessionConfig = configService.getOrThrow('common.session');
    const sessionMiddleware = session({
        ...sessionConfig,
        store: new ConnectRedis({
            client: redisClient,
            prefix: 'sessions:',
            ttl: Math.floor(
                parseInt(sessionConfig.cookie.maxAge || '3600000') / 1000,
            ),
        }),
    });

    const app = await NestFactory.create(module, {
        logger: ['debug', 'log', 'warn', 'error', 'fatal'],
    });

    app.use(cookieParser());
    app.use(sessionMiddleware);

    return [microservice, app, configService.get(service)];
}
