import { RedisService } from '@liaoliaots/nestjs-redis';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import ConnectRedis from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieParser = require('cookie-parser');

const logger = new Logger();

export async function createHttpService(
    name: string,
    service: `service.${string}`,
    module: any,
) {
    logger.log(
        `Creating HTTP service ${service.split('.')[1]}`,
        'CreateService',
    );
    const app = await NestFactory.create(module, {
        logger: ['debug', 'log', 'warn', 'error', 'fatal'],
    });

    const configService = app.get(ConfigService);
    const redisService = app.get(RedisService);

    // Create a Redis client
    const redisClient = redisService.getClient();

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

    // Serialize and deserialize user
    passport.serializeUser<string>((user, done) => {
        done(null, JSON.stringify(user));
    });

    passport.deserializeUser<string>((userStr, done) => {
        done(null, JSON.parse(userStr));
    });

    app.use(cookieParser());
    app.use(sessionMiddleware);
    app.use(passport.initialize());
    app.use(passport.session());

    const httpPort = configService.get(`${service}.httpPort`) || '80';
    await app.listen(parseInt(httpPort));

    logger.log(
        `${name} HTTP microservice listening at ${httpPort}`,
        'Microservice',
    );
}
