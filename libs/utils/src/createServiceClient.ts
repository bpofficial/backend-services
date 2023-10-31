import { AppConfigModule } from '@app/config';
import { ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions, Transport } from '@nestjs/microservices';

export function createServiceClient(
    service: `service.${string}`,
): ClientsProviderAsyncOptions {
    return {
        name: service.split('.')[1],
        imports: [AppConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
            transport: Transport.GRPC,
            options: {
                url: configService.getOrThrow(`${service}.url`),
                package: configService.getOrThrow(`${service}.package`),
                protoPath: configService.getOrThrow(`${service}.proto`),
            },
        }),
    };
}
