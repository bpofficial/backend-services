import { MongoDbModule } from '@app/db';
import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { MemberGrpcController } from './grpc.controller';
import { MemberInvitationSchema } from './invitation.model';
import { MemberSchema } from './member.model';
import { MemberService } from './member.service';

@Module({
    imports: [
        SharedModule,
        MongoDbModule.forRoot('service.member', {
            member: MemberSchema,
            invitation: MemberInvitationSchema,
        }),
    ],
    controllers: [MemberGrpcController],
    providers: [MemberService],
})
export class MemberModule {}
