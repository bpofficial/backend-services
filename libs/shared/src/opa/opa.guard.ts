import { OrgServiceProvider } from '@app/clients/org';
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';
import { OpaService } from './opa.service';

@Injectable()
export class OpaGuard implements CanActivate {
    private readonly logger = new Logger('OpaGuard');

    constructor(
        private reflector: Reflector,
        private opaService: OpaService,
        private orgServiceProvider: OrgServiceProvider,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const handler = context.getHandler();
        const orgService = this.orgServiceProvider.getService();

        let method: string, user: string, orgId: string;

        if (context.getType() === 'http') {
            const request = context.switchToHttp().getRequest();
            this.logger.debug(
                `canActivate: http, request=${JSON.stringify(request)}`,
            );

            method = request.method;
            user = request.user;
            orgId = request.params.oid;
        } else if (context.getType() === 'rpc') {
            const data = context.switchToRpc().getData();
            this.logger.debug(`canActivate: rpc, data=${JSON.stringify(data)}`);
            method = handler.name;
            user = data.uid; // Assuming user data is part of the gRPC request data
            orgId = data.oid; // Assuming org ID is part of the gRPC request data
        } else {
            this.logger.warn(`canActivate: unsupported execution context`);
            throw new RpcException('Unsupported execution context');
        }

        this.logger.debug(
            `canActivate: uid=${user}, oid=${orgId}, method=${method}`,
        );

        // Assuming the OrgService has a method getOrgById for fetching an organization
        const org = await orgService.FindOneById({
            oid: orgId,
        });

        if (org && Object.keys(org).length) {
            this.logger.debug(`canActivate: org=${JSON.stringify(org)}`);
        } else {
            this.logger.debug(`canActivate: org not found`);
        }

        const input = {
            method,
            user,
            resource: org,
        };

        const policy = this.reflector.get<string>('policy', handler);
        this.logger.debug(`canActivate: policy=${policy}`);

        if (policy && typeof policy === 'string') {
            return this.opaService.evaluatePolicy(policy, input);
        }

        return true;
    }
}
