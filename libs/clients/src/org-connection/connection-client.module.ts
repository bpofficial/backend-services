import { createServiceClient } from '@app/utils';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ConnectionServiceProvider } from './connection-provider';

@Module({
    imports: [
        ClientsModule.registerAsync({
            clients: [createServiceClient('service.connection')],
        }),
    ],
    providers: [ConnectionServiceProvider],
    exports: [ClientsModule, ConnectionServiceProvider],
})
export class ConnectionClientModule {}
