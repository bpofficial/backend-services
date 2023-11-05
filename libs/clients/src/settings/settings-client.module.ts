import { createServiceClient } from '@app/utils';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { SettingsServiceProvider } from './settings-provider';

@Module({
    imports: [
        ClientsModule.registerAsync({
            clients: [createServiceClient('service.settings')],
        }),
    ],
    providers: [SettingsServiceProvider],
    exports: [ClientsModule, SettingsServiceProvider],
})
export class SettingsClientModule {}
