import {
    BulkSendRequest,
    BulkSendResponse,
    SendRequest,
    SendResponse,
} from '@app/proto/notify';

export abstract class NotifyBase {
    abstract send(data: SendRequest): Promise<SendResponse>;
    abstract sendBulk(data: BulkSendRequest): Promise<BulkSendResponse>;
}
