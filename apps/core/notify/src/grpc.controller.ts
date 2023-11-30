import { Controller, Logger } from '@nestjs/common';
import { NotifyService } from './notify.service';

@Controller()
export class NotifyGrpcController {
    private readonly logger = new Logger('NotifyGrpcController');

    constructor(private readonly notifyService: NotifyService) {}
}
