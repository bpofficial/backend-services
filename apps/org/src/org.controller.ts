import { CreateOrg, NotFound, Org, OrgByDomain, OrgById } from '@app/proto';
import { OpaPolicy } from '@app/shared';
import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { OrgService } from './org.service';

@Controller()
export class OrgController {
    private readonly logger = new Logger('OrgController');

    constructor(private readonly orgService: OrgService) {}

    @GrpcMethod('OrgService', 'FindOneById')
    async findOrgById(data: OrgById): Promise<Org | NotFound> {
        this.logger.debug(`findOrgById: uid=${data.uid}, oid=${data.oid}`);
        return this.orgService.getOrgById(data);
    }

    @GrpcMethod('OrgService', 'FindOneByDomain')
    async findOneByDomain(data: OrgByDomain): Promise<Org | NotFound> {
        this.logger.debug(
            `findOneByDomain: uid=${data.uid}, domain=${data.domain}`,
        );
        return this.orgService.getOrgByDomain(data);
    }

    @GrpcMethod('OrgService', 'Create')
    async createOrg(data: CreateOrg): Promise<Org> {
        this.logger.debug(
            `createOrg: name=${data.name}, domain=${data.domain}`,
        );
        return this.orgService.createOrg(data);
    }

    @OpaPolicy('org/allow')
    @GrpcMethod('OrgService', 'Delete')
    async deleteOrg(data: OrgById): Promise<void> {
        this.logger.debug(`deleteOrg: oid=${data.oid}, uid=${data.uid}`);
        await this.orgService.deleteOrg(data);
    }
}
