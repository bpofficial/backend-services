// mongo-db.module.ts
import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Global()
@Module({})
export class MongoDbModule {
    static forRoot(
        service: `service.${string}`,
        name: string,
        schema: any,
    ): DynamicModule {
        const configProvider = {
            provide: `Config/${service}`,
            useFactory: (configService: ConfigService) => {
                const uri = configService.getOrThrow(`${service}.mongodb.uri`);
                return { uri };
            },
            inject: [ConfigService],
        };

        const modelProvider = {
            provide: `Model/${name}`,
            useFactory: (connection: Connection) =>
                connection.model(name, schema),
            inject: ['DATABASE_CONNECTION'],
        };

        return {
            module: MongoDbModule,
            imports: [
                ConfigModule,
                MongooseModule.forRootAsync({
                    imports: [ConfigModule],
                    useFactory: async (serviceConfig) => {
                        return { uri: serviceConfig.uri };
                    },
                    inject: [`Config/${service}`],
                }),
                MongooseModule.forFeature([{ name, schema }]),
            ],
            providers: [configProvider, modelProvider],
            exports: [MongooseModule, modelProvider],
        };
    }

    static forFeature(name: string, schema: any): DynamicModule {
        const modelProvider = {
            provide: `Model/${name}`,
            useFactory: (connection: Connection) =>
                connection.model(name, schema),
            inject: ['DATABASE_CONNECTION'],
        };

        return {
            module: MongoDbModule,
            imports: [MongooseModule.forFeature([{ name, schema }])],
            providers: [modelProvider],
            exports: [modelProvider],
        };
    }
}
