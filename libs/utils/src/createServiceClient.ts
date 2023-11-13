import { AppConfigModule } from '@app/config';
import { ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions } from '@nestjs/microservices';
import { getGrpcConfig } from './getGrpcConfig';

export function createServiceClient(
    service: `service.${string}`,
): ClientsProviderAsyncOptions {
    return {
        name: service.split('.')[1],
        imports: [AppConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            return getGrpcConfig(service, configService);
        },
    };
}
