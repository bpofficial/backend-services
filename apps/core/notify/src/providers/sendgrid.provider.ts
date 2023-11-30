import {
    SendRequest,
    SendResponse,
    BulkSendRequest,
    BulkSendResponse,
} from '@app/proto/notify';
import { NotifyProvider } from '../types/notify-provider';

export class SendGridProvider extends NotifyProvider {
    send(data: SendRequest): Promise<SendResponse> {
        throw new Error('Method not implemented.');
    }

    sendBulk(data: BulkSendRequest): Promise<BulkSendResponse> {
        throw new Error('Method not implemented.');
    }
}
