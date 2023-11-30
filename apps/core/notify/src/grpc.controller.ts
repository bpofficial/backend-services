import { Controller, Logger } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
    BulkSendRequest,
    BulkSendResponse,
    SendRequest,
    SendResponse,
} from '@app/proto/notify';

@Controller()
export class NotifyGrpcController {
    private readonly logger = new Logger('NotifyGrpcController');

    constructor(private readonly notifyService: NotifyService) {}

    @GrpcMethod('Send')
    async send(data: SendRequest): Promise<SendResponse> {
        return this.notifyService.send(data);
    }

    @GrpcMethod('SendBulk')
    async sendBulk(data: BulkSendRequest): Promise<BulkSendResponse> {
        return this.notifyService.sendBulk(data);
    }
}
