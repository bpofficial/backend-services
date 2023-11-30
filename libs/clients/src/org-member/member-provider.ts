import { MemberService } from '@app/proto/member';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class MemberServiceProvider implements OnModuleInit {
    private memberService: MemberService;

    constructor(@Inject('member') private client: ClientGrpc) {}

    onModuleInit() {
        this.memberService =
            this.client.getService<MemberService>('MemberService');
    }

    getService(): MemberService {
        return this.memberService;
    }
}
