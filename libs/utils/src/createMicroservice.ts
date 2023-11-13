import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync } from 'fs';
import { getGrpcConfig } from './getGrpcConfig';
import { registerService } from './registerService';

const logger = new Logger();

export async function createMicroservice(
    name: string,
    service: `service.${string}`,
    app: INestApplication<any>,
    configService: ConfigService,
) {
    const grpcConfig = getGrpcConfig(service, configService);
    const hasGrpc = existsSync(grpcConfig.options.protoPath);

    if (hasGrpc) {
        app.connectMicroservice({
            logger: ['debug', 'log', 'warn', 'error', 'fatal'],
            ...grpcConfig,
        });

        await app.startAllMicroservices();

        // Register with consul service discovery (when needed)
        await registerService(service, configService);

        logger.log(
            `${name} GRPC microservice listening at ${grpcConfig.options.url}`,
            'Microservice',
        );
    }
}
