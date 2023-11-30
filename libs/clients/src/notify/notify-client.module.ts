import { createServiceClient } from '@app/utils';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { NotifyServiceProvider } from './notify-provider';

@Module({
    imports: [
        ClientsModule.registerAsync({
            clients: [createServiceClient('service.notify')],
        }),
    ],
    providers: [NotifyServiceProvider],
    exports: [ClientsModule, NotifyServiceProvider],
})
export class NotifyClientModule {}
