import { OrgService } from '@app/proto';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class OrgServiceProvider implements OnModuleInit {
    private orgService: OrgService;

    constructor(@Inject('org') private client: ClientGrpc) {}

    onModuleInit() {
        this.orgService = this.client.getService<OrgService>('OrgService');
    }

    getService(): OrgService {
        return this.orgService;
    }
}
