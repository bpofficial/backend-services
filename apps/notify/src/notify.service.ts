import {
    BulkSendRequest,
    BulkSendResponse,
    SendRequest,
    SendResponse,
} from '@app/proto/notify';
import { Injectable, Logger } from '@nestjs/common';
import { EmailNotifyMethod } from './methods/email.method';
import { SMSNotifyMethod } from './methods/sms.method';
import { ConfigService } from '@nestjs/config';
import { NotifyMethod } from './types/notify-method';

@Injectable()
export class NotifyService {
    private readonly logger = new Logger('NotifyService');

    constructor(private readonly configService: ConfigService) {}

    async send(data: SendRequest): Promise<SendResponse> {
        let method: NotifyMethod;
        if (data.email) {
            method = new EmailNotifyMethod(this.configService);
        } else if (data.sms) {
            method = new SMSNotifyMethod(this.configService);
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
