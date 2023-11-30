import {
    BulkSendRequest,
    BulkSendResponse,
    SendRequest,
    SendResponse,
} from '@app/proto/notify';
import { NotImplementedException } from '@nestjs/common';

export abstract class NotifyMethod {
    async send(data: SendRequest): Promise<SendResponse> {
        throw new NotImplementedException();
    }

    async sendBulk(data: BulkSendRequest): Promise<BulkSendResponse> {
        throw new NotImplementedException();
    }
}
