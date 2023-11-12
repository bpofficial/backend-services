import { AppConfigModule } from '@app/config';
import { ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export function createServiceClient(
    service: `service.${string}`,
): ClientsProviderAsyncOptions {
    return {
        name: service.split('.')[1],
        imports: [AppConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            const protoPath = join(
                __dirname,
                configService.getOrThrow(`${service}.proto`),
            );

            return {
                transport: Transport.GRPC,
                options: {
                    url: `0.0.0.0:${configService.getOrThrow(
                        `${service}.grpcPort`,
                    )}`,
                    package: configService.getOrThrow(`${service}.package`),
                    protoPath,
                },
            };
        },
    };
}
