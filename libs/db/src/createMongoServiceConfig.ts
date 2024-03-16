import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export function createServiceConfigProvider(service: string): Provider {
    return {
        provide: `Config/${service}`,
        useFactory: (configService: ConfigService) => {
            const uri = configService.get(`mongodb.uri`);
            const dbName = configService.get(`mongodb.database`) || service;

            const auth = (uri.includes('@') ? uri.split('@')?.[0] ?? ':' : ':').split(':');
            let host = uri.includes('@') ? uri.split('@')?.[1] ?? '' : uri;
            host = host.toLowerCase().startsWith('mongodb://') ? host : `mongodb://${host}`;
            host = host.endsWith('/') ? host : `${host}/`;

            return { uri: host + dbName,
                auth: auth ? {
                    username: String(auth[0]),
                    password: String(auth[1])
                } : undefined,
            };
        },
        inject: [ConfigService],
    };
}
