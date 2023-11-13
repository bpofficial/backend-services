import { AppConfigModule } from '@app/config';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions } from '@nestjs/microservices';
import { getGrpcConfig } from './getGrpcConfig';

const logger = new Logger('CreateServiceClient');

export function createServiceClient(
    service: `service.${string}`,
): ClientsProviderAsyncOptions {
    return {
        name: service.split('.')[1],
        imports: [AppConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            const config = getGrpcConfig(service, configService);
            logger.log(
                `Creating client for service '${service}' at '${config.options.url}'`,
            );

            return config;
        },
    };
}
