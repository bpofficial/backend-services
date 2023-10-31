import { AppConfigModule } from '@app/config';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export async function createService(service: `service.${string}`, module: any) {
    const app = await NestFactory.createApplicationContext(AppConfigModule, {
        logger: ['error', 'fatal'],
    });

    const configService = app.get(ConfigService);

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

    return [microservice, configService.get(service)];
}
