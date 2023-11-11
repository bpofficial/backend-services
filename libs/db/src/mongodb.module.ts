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
        logger.log(`Creating module for ${service}`);
        const dbProvider = {
            provide: 'DATABASE_CONNECTION',
            inject: [ConfigService],
            useFactory: (
                configService: ConfigService,
            ): Promise<typeof mongoose> => {
                const uri = configService.getOrThrow(`${service}.mongodb.uri`);
                logger.debug(`Connecting to MongoDB for ${service}`);
                return mongoose.connect(uri);
            },
        };

        const modelProviders = Object.keys(schemas).map((modelName) => ({
            provide: `Model/${modelName}`,
            inject: ['DATABASE_CONNECTION'],
            useFactory: (connection: Connection) =>
                connection.model(modelName, schemas[modelName]),
        }));

        logger.log(`Found ${modelProviders.length} models to provide.`);

        return {
            module: MongoDbModule,
            imports: [
                ConfigModule,
                MongooseModule.forRootAsync({
                    imports: [ConfigModule],
                    useFactory: (configService: ConfigService) => {
                        const uri = configService.getOrThrow(
                            `${service}.mongodb.uri`,
                        );

                        return { uri };
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
