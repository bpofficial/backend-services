import { NotifyService } from '@app/proto/notify';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class NotifyServiceProvider implements OnModuleInit {
    private notifyService: NotifyService;

    constructor(@Inject('notify') private client: ClientGrpc) {}

    onModuleInit() {
        this.notifyService =
            this.client.getService<NotifyService>('NotifyService');
    }

    getService(): NotifyService {
        return this.notifyService;
    }
}
