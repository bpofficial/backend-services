import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import ConnectRedis from 'connect-redis';
import * as session from 'express-session';
import * as redis from 'redis';
import { createMicroservice } from './createMicroservice';
import { hasGrpcMethods } from './hasGrpcMethods';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieParser = require('cookie-parser');

const logger = new Logger();

export async function createService(
    name: string,
    service: `service.${string}`,
    module: any,
) {
    logger.log(`Creating service ${service.split('.')[1]}`, 'CreateService');
    const app = await NestFactory.create(module, {
        logger: ['debug', 'log', 'warn', 'error', 'fatal'],
    });

    const configService = app.get(ConfigService);

    await createMicroservice(name, service, app, configService);

    // Here we check to see if there's any HTTP controllers before starting
    // the HTTP server, otherwise it'd be running uneccessarily.
    // Not all microservices have HTTP endpoints as they may be completely
    // internal.
    const reflector = app.get(Reflector);
    const controllers = reflector.get<string[]>('controllers', module);

    let hasHttp = false;
    if (controllers && controllers.length > 0) {
        controllers.forEach((cls) => {
            if (!hasGrpcMethods(cls)) {
                hasHttp = true;
            }
        });
    }

    if (hasHttp) {
        // Create a Redis client
        const redisClient = redis.createClient({
            ...configService.getOrThrow('redis.uri'),
        });

        const sessionConfig = configService.getOrThrow('session');
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

        app.use(cookieParser());
        app.use(sessionMiddleware);

        const httpPort = configService.get(`${service}.httpPort`) || '80';
        await app.listen(parseInt(httpPort));

        logger.log(
            `${name} HTTP microservice listening at ${httpPort}`,
            'Microservice',
        );
    }
}
