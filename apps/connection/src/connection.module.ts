import { MongoDbModule } from '@app/db';
import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { ConnectionController } from './connection.controller';
import { ConnectionSchema } from './connection.model';
import { ConnectionService } from './connection.service';

@Module({
    imports: [
        SharedModule,
        MongoDbModule.forRoot(
            'service.connection',
            'connection',
            ConnectionSchema,
        ),
    ],
    controllers: [ConnectionController],
    providers: [ConnectionService],
})
export class ConnectionModule {}
