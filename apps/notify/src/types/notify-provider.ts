import { ConfigService } from '@nestjs/config';
import { NotifyMethod } from './notify-method';

export abstract class NotifyProvider extends NotifyMethod {
    constructor(configService: ConfigService) {
        super(configService);
    }

    getProvider(): NotifyProvider {
        return this;
    }
}
