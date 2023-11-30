import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotifyService {
    private readonly logger = new Logger('NotifyService');
}
