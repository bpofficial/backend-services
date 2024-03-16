import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { createServiceConfigProvider } from './createMongoServiceConfig';

export function createMongoDbModule(service: `service.${string}`) {
    return [
        ConfigModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (serviceConfig) => {
                const uri = serviceConfig.uri;
                const dbName = serviceConfig.dbName || service;

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
            inject: [`Config/${service}`],
        }),
        createServiceConfigProvider(service),
    ];
}
