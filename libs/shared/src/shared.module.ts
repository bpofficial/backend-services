import {
    AccountClientModule,
    ConnectionClientModule,
    MemberClientModule,
    NotifyClientModule,
    UserClientModule,
} from '@app/clients';
import { OrgClientModule } from '@app/clients/org';
import { AppConfigModule } from '@app/config';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DynamicStrategyService } from './auth/dynamic.strategy';
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
    providers: [OpaService, DynamicStrategyService],
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
        DynamicStrategyService,
        RedisModule,
    ],
})
export class SharedModule {}
