import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { existsSync } from 'fs';
import { dirname, join } from 'path';

const logger = new Logger();

export async function createMicroservice(
    name: string,
    service: string,
    app: INestApplication<any>,
    configService: ConfigService,
) {
    const serviceConfig = configService.getOrThrow(service);

    const protoPath = join(
        dirname(__filename),
        configService.get(`${service}.proto`) || `${service}.proto`,
    );

    const hasGrpc = existsSync(protoPath);

    if (hasGrpc) {
        app.connectMicroservice({
            logger: ['debug', 'log', 'warn', 'error', 'fatal'],
            transport: Transport.GRPC,
            options: {
                package: configService.getOrThrow(`${service}.package`),
                protoPath,
                url: `0.0.0.0:${configService.getOrThrow(
                    `${service}.grpcPort`,
                )}`,
            },
        });

        await app.startAllMicroservices();
        logger.log(
            `${name} GRPC microservice listening at ${serviceConfig.grpcPort}`,
            'Microservice',
        );
    }
}
