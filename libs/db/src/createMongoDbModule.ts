import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { createServiceConfigProvider } from './createMongoServiceConfig';

export function createMongoDbModule(service: `service.${string}`) {
    return [
        ConfigModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (serviceConfig) => {
                const dbName = serviceConfig.dbName || service;
                return { uri: serviceConfig.uri + dbName };
            },
            inject: [`Config/${service}`],
        }),
        createServiceConfigProvider(service),
    ];
}
