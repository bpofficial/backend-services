import { MongoDbModule } from '@app/db';
import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { MemberHttpController } from './http.controller';
import { MemberInvitationSchema } from './invitation.model';
import { MemberController } from './member.controller';
import { MemberSchema } from './member.model';
import { MemberService } from './member.service';

@Module({
    imports: [
        SharedModule,
        MongoDbModule.forRoot('service.member', 'member', MemberSchema),
        MongoDbModule.forFeature('invitation', MemberInvitationSchema),
    ],
    controllers: [MemberController, MemberHttpController],
    providers: [MemberService],
})
export class MemberModule {}
