import { ConfigService } from '@nestjs/config';
import { NotifyProvider } from './notify-provider';
import { NotifyBase } from './notify-base';
import {
    SendRequest,
    SendResponse,
    BulkSendRequest,
    BulkSendResponse,
} from '@app/proto/notify';

export abstract class NotifyMethod implements NotifyBase {
    protected provider: NotifyProvider;

    constructor(protected readonly configService: ConfigService) {
        //
    }

    send(data: SendRequest): Promise<SendResponse> {
        return this.getProvider().send(data);
    }

    sendBulk(data: BulkSendRequest): Promise<BulkSendResponse> {
        return this.getProvider().sendBulk(data);
    }

    getProvider(): NotifyProvider {
        return this.provider;
    }
}
