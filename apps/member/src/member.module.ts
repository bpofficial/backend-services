import { MongoDbModule } from '@app/db';
import { OrgIdMiddleware, SharedModule } from '@app/shared';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
export class MemberModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(OrgIdMiddleware).forRoutes(MemberHttpController);
    }
}
