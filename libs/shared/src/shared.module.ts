import { OrgClientModule } from '@app/clients/org';
import { AppConfigModule } from '@app/config';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OpaService } from './opa/opa.service';

@Module({
    imports: [AppConfigModule, OrgClientModule, HttpModule],
    providers: [OpaService],
    exports: [OpaService, OrgClientModule],
})
export class SharedModule {}
