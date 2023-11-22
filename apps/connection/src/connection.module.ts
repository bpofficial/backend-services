import { MongoDbModule } from '@app/db';
import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { ConnectionSchema } from './connection.model';
import { ConnectionService } from './connection.service';
import { ConnectionGrpcController } from './grpc.controller';

@Module({
    imports: [
        SharedModule,
        MongoDbModule.forRoot('service.connection', {
            connection: ConnectionSchema,
        }),
    ],
    controllers: [ConnectionGrpcController],
    providers: [ConnectionService],
})
export class ConnectionModule {}
