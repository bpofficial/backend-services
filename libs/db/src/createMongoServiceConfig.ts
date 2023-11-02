// service-config.provider.ts
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export function createServiceConfigProvider(service: string): Provider {
    return {
        provide: `Config/${service}`,
        useFactory: (configService: ConfigService) => {
            const uri = configService.get(`${service}.mongodb.uri`);
            return { uri };
        },
        inject: [ConfigService],
    };
}
