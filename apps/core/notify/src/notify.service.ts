import {
    BulkSendRequest,
    BulkSendResponse,
    SendRequest,
    SendResponse,
} from '@app/proto/notify';
import { Injectable, Logger } from '@nestjs/common';
import { NotifyMethod } from './methods/base';
import { EmailNotifyMethod } from './methods/email.method';
import { SMSNotifyMethod } from './methods/sms.method';

@Injectable()
export class NotifyService {
    private readonly logger = new Logger('NotifyService');

    async send(data: SendRequest): Promise<SendResponse> {
        let method: NotifyMethod;
        if (data.email) {
            method = new EmailNotifyMethod();
        } else if (data.sms) {
            method = new SMSNotifyMethod();
        }

        return method.send(data);
    }

    async sendBulk(data: BulkSendRequest): Promise<BulkSendResponse> {
        const result = await Promise.allSettled(
            data.requests.map((item) => this.send(item)),
        );

        const errors = result
            .filter((item) => item.status === 'rejected')
            .map((item: PromiseRejectedResult, idx) => ({
                message: item.reason ?? 'Failed to send notification',
                recipient: data.requests[idx].recipient,
            }));

        return { errors };
    }
}
