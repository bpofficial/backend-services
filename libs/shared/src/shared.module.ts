import {
    AccountClientModule,
    ConnectionClientModule,
    MemberClientModule,
    UserClientModule,
} from '@app/clients';
import { OrgClientModule } from '@app/clients/org';
import { AppConfigModule } from '@app/config';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DynamicStrategyService } from './auth/dynamic.strategy';
import { OpaService } from './opa/opa.service';

@Module({
    imports: [
        AppConfigModule,
        HttpModule,
        OrgClientModule,
        MemberClientModule,
        UserClientModule,
        ConnectionClientModule,
        AccountClientModule,
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
        AppConfigModule,
        DynamicStrategyService,
    ],
})
export class SharedModule {}
