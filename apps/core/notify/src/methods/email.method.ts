import {
    SendRequest,
    SendResponse,
    BulkSendRequest,
    BulkSendResponse,
} from '@app/proto/notify';
import { NotifyMethod } from './base';

export class EmailNotifyMethod implements NotifyMethod {
    send(data: SendRequest): Promise<SendResponse> {
        throw new Error('Method not implemented.');
    }

    sendBulk(data: BulkSendRequest): Promise<BulkSendResponse> {
        throw new Error('Method not implemented.');
    }
}
