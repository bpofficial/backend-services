import { MemberClientModule, UserClientModule } from '@app/clients';
import { OrgClientModule } from '@app/clients/org';
import { AppConfigModule } from '@app/config';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OpaService } from './opa/opa.service';

@Module({
    imports: [
        AppConfigModule,
        HttpModule,
        OrgClientModule,
        MemberClientModule,
        UserClientModule,
    ],
    providers: [OpaService],
    exports: [
        OpaService,
        OrgClientModule,
        MemberClientModule,
        UserClientModule,
    ],
})
export class SharedModule {}
