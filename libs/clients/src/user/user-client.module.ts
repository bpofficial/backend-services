import { createServiceClient } from '@app/utils';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { UserServiceProvider } from './user-provider';

@Module({
    imports: [
        ClientsModule.registerAsync({
            clients: [createServiceClient('service.user')],
        }),
    ],
    providers: [UserServiceProvider],
    exports: [ClientsModule, UserServiceProvider],
})
export class UserClientModule {}
