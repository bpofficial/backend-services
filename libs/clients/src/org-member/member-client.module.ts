import { createServiceClient } from '@app/utils';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MemberServiceProvider } from './member-provider';

@Module({
    imports: [
        ClientsModule.registerAsync({
            clients: [createServiceClient('service.member')],
        }),
    ],
    providers: [MemberServiceProvider],
    exports: [ClientsModule, MemberServiceProvider],
})
export class MemberClientModule {}
