import {
    AccountClientModule,
    ConnectionClientModule,
    MemberClientModule,
    NotifyClientModule,
    UserClientModule,
    OrgClientModule,
} from '@app/clients';
import { AppConfigModule } from '@app/config';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HealthModule } from './health';
import { OpaService } from './opa/opa.service';
import { RedisModule } from './redis';

@Module({
    imports: [
        AppConfigModule,
        HttpModule,
        OrgClientModule,
        MemberClientModule,
        UserClientModule,
        ConnectionClientModule,
        AccountClientModule,
        NotifyClientModule,
        RedisModule,
        HealthModule,
    ],
    providers: [OpaService],
    exports: [
        OpaService,
        HttpModule,
        OrgClientModule,
        MemberClientModule,
        UserClientModule,
        ConnectionClientModule,
        AccountClientModule,
        NotifyClientModule,
        AppConfigModule,
        RedisModule,
    ],
})
export class SharedModule {}
