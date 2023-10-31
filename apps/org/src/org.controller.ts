import { Org, OrgById } from '@app/proto';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { OrgService } from './org.service';

@Controller()
export class OrgController {
    private readonly logger = new Logger('OrgController');

    constructor(private readonly orgService: OrgService) {}

    @GrpcMethod('OrgService', 'FindOne')
    async findOrgById(
        data: OrgById,
        metadata: Metadata,
        call: ServerUnaryCall<any, any>,
    ): Promise<Org> {
        this.logger.debug(`findOrgById: uid=${data.uid}, oid=${data.oid}`);
        return this.orgService.getOrgById(data);
    }
}
