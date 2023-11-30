import { ConfigService } from '@nestjs/config';
import { NotifyMethod } from '../types/notify-method';
import { SendGridProvider } from '../providers/sendgrid.provider';

export class EmailNotifyMethod extends NotifyMethod {
    constructor(configService: ConfigService) {
        super(configService);
        this.provider = new SendGridProvider(configService);
    }
}
