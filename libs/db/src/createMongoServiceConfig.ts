import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export function createServiceConfigProvider(service: string): Provider {
    return {
        provide: `Config/${service}`,
        useFactory: (configService: ConfigService) => {
            const uri = configService.get(`mongodb.uri`);
            const db = (
                configService.get('mongodb.database') || service
            ).replace(/\./gi, '-');

            return { uri: uri + db };
        },
        inject: [ConfigService],
    };
}
