import { createServiceClient } from '@app/utils';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AccountServiceProvider } from './account-provider';

@Module({
    imports: [
        ClientsModule.registerAsync({
            clients: [createServiceClient('service.account')],
        }),
    ],
    providers: [AccountServiceProvider],
    exports: [ClientsModule, AccountServiceProvider],
})
export class AccountClientModule {}
