import { createServiceClient } from '@app/utils';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { OrgServiceProvider } from './org-provider';

@Module({
    imports: [
        ClientsModule.registerAsync({
            clients: [createServiceClient('service.org')],
        }),
    ],
    providers: [OrgServiceProvider],
    exports: [ClientsModule, OrgServiceProvider],
})
export class OrgClientModule {}
