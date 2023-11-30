import {
    SendRequest,
    SendResponse,
    BulkSendRequest,
    BulkSendResponse,
} from '@app/proto/notify';
import { ConfigService } from '@nestjs/config';
import { NotifyProvider } from '../types/notify-provider';

export class TwilioProvider extends NotifyProvider {
    constructor(configService: ConfigService) {
        super(configService);
    }

    send(data: SendRequest): Promise<SendResponse> {
        throw new Error('Method not implemented.');
    }

    sendBulk(data: BulkSendRequest): Promise<BulkSendResponse> {
        throw new Error('Method not implemented.');
    }
}
