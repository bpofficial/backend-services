// mongo-db.module.ts
import { DynamicModule, Global, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose, { Connection } from 'mongoose';

const logger = new Logger('MongoDbModule');

@Global()
@Module({})
export class MongoDbModule {
    static forRoot(
        service: `service.${string}`,
        schemas: Record<string, any>,
    ): DynamicModule {
        const dbProvider = {
            provide: 'DATABASE_CONNECTION',
            useFactory: async (configService: ConfigService) => {
                const uri = await configService.getOrThrow('mongodb.uri');
                const db = (
                    (await configService.get('mongodb.database')) || service
                ).replace(/\./gi, '-');

                logger.log(`Creating module for ${service}`);
                logger.debug(
                    `Connecting to MongoDB for ${service} at ${uri + db}`,
                );

                return mongoose.connect(uri, { autoCreate: true, dbName: db });
            },
            inject: [ConfigService],
        };

        const modelProviders = Object.keys(schemas).map((modelName) => ({
            provide: `Model/${modelName}`,
            useFactory: (connection: Connection) =>
                connection.model(modelName, schemas[modelName]),
            inject: ['DATABASE_CONNECTION'],
        }));

        return {
            module: MongoDbModule,
            imports: [
                ConfigModule,
                MongooseModule.forRootAsync({
                    imports: [ConfigModule],
                    useFactory: (configService: ConfigService) => {
                        const uri = configService.getOrThrow(`mongodb.uri`);
                        const db = (
                            configService.get('mongodb.database') || service
                        ).replace(/\./gi, '-');

                        return { uri, autoCreate: true, dbName: db };
                    },
                    inject: [ConfigService],
                }),
                MongooseModule.forFeature(
                    Object.keys(schemas).map((modelName) => ({
                        name: modelName,
                        schema: schemas[modelName],
                    })),
                ),
            ],
            providers: [dbProvider, ...modelProviders],
            exports: [MongooseModule, dbProvider, ...modelProviders],
        };
    }
}
