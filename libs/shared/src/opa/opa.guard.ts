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
import { Request } from 'express';

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

        let method: string | string[], uid: string, oid: string;

        if (context.getType() === 'http') {
            const request = context.switchToHttp().getRequest() as Request;
            this.logger.debug(
                `canActivate: http, request=${JSON.stringify(request)}`,
            );

            method = request.method;
            uid = request.user.id;
            oid = request.user.oid;
        } else if (context.getType() === 'rpc') {
            const data = context.switchToRpc().getData();
            this.logger.debug(`canActivate: rpc, data=${JSON.stringify(data)}`);
            method = this.reflector.get<string>('permission', handler);
            uid = data.uid; // Assuming user data is part of the gRPC request data
            oid = data.oid; // Assuming org ID is part of the gRPC request data
        } else {
            this.logger.warn(`canActivate: unsupported execution context`);
            throw new RpcException('Unsupported execution context');
        }

        this.logger.debug(
            `canActivate: uid=${uid}, oid=${oid}, method=${method}`,
        );

        // Assuming the OrgService has a method getOrgById for fetching an organization
        const org = await orgService.FindOneById({ oid });

        if (org && Object.keys(org).length) {
            this.logger.debug(`canActivate: org=${JSON.stringify(org)}`);
        } else {
            this.logger.debug(`canActivate: org not found`);
        }

        const input = {
            method,
            user: uid,
            resource: oid,
        };

        const policy = this.reflector.get<string>('policy', handler);
        this.logger.debug(`canActivate: policy=${policy}`);

        if (policy && typeof policy === 'string') {
            if (Array.isArray(method)) {
                const results = await Promise.all(
                    method.map((m) =>
                        this.opaService.evaluatePolicy(policy, {
                            ...input,
                            method: m,
                        }),
                    ),
                );
                return results.some((v) => !!v);
            } else {
                return this.opaService.evaluatePolicy(policy, input);
            }
        }

        return true;
    }
}
