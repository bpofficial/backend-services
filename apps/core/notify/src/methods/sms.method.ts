import { ConfigService } from '@nestjs/config';
import { TwilioProvider } from '../providers/twilio.provider';
import { NotifyMethod } from '../types/notify-method';

export class SMSNotifyMethod extends NotifyMethod {
    constructor(configService: ConfigService) {
        super(configService);
        this.provider = new TwilioProvider(configService);
    }
}
