import { AppConfigModule } from '@app/config';
import { INestApplication, INestMicroservice } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export async function createService(
    service: `service.${string}`,
    module: any,
): Promise<[INestMicroservice, INestApplication, any]> {
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

    const app = await NestFactory.create(module, {
        logger: ['debug', 'log', 'warn', 'error', 'fatal'],
    });

    return [microservice, app, configService.get(service)];
}
