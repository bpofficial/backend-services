import { Module } from '@nestjs/common';
import { AccountHttpController } from './account.controller';
import { ConnectionHttpController } from './connection.controller';
import { MemberHttpController } from './member.controller';
import { OrgHttpController } from './org.controller';
import { UserHttpController } from './user.controller';
import { SharedModule } from '@app/shared';
import { LocalAccountHttpController } from './local-account.controller';

@Module({
    imports: [SharedModule],
    controllers: [
        AccountHttpController,
        ConnectionHttpController,
        MemberHttpController,
        OrgHttpController,
        UserHttpController,
        LocalAccountHttpController,
    ],
})
export class HttpApiModule {}
