import { MemberServiceProvider, UserServiceProvider } from '@app/clients';
import { MongoModel } from '@app/db';
import {
    CreateOrgRequest,
    CreateOrgResponse,
    DeleteOrgRequest,
    DeleteOrgResponse,
    Org,
    OrgByDomain,
    OrgById,
    OrgResponse,
} from '@app/proto/org';
import { Injectable, Logger } from '@nestjs/common';
import type { Model } from 'mongoose';
import { Organisation } from './org.model';

@Injectable()
export class OrgService {
    private readonly logger = new Logger('OrgService');

    constructor(
        @MongoModel('organisation') private model: Model<Organisation>,
        private readonly userServiceProvider: UserServiceProvider,
        private readonly memberServiceProvider: MemberServiceProvider,
    ) {}

    async getOrgById(req: OrgById): Promise<OrgResponse> {
        this.logger.debug(`getOrgById: oid=${req.oid}`);
        const result = await this.model.findById(req.oid);

        if (result) {
            return { org: Org.fromJSON(result.toJSON()) };
        } else {
            this.logger.warn(`getOrgById: not found, oid=${req.oid}`);
            return { error: { message: 'Not found' } };
        }
    }

    async getOrgByDomain(req: OrgByDomain): Promise<OrgResponse> {
        this.logger.debug(`getOrgByDomain: domain=${req.domain}`);
        const result = await this.model.findOne({ domain: req.domain });

        if (result) {
            return { org: Org.fromJSON(result.toJSON()) };
        } else {
            this.logger.warn(`getOrgByDomain: not found, domain=${req.domain}`);
            return { error: { message: 'Not found' } };
        }
    }

    async createOrg(req: CreateOrgRequest): Promise<CreateOrgResponse> {
        this.logger.debug(
            `createOrg: name=${req.name}, domain=${req.domain}, owner=${req.owner}`,
        );

        const result = await this.model.create({
            name: req.name,
            domain: req.domain,
            owner: req.owner,
        });

        const userService = this.userServiceProvider.getService();
        const memberService = this.memberServiceProvider.getService();

        const user = await userService.GetUser({ uid: req.owner });
        if (!user?.user || user.error) {
            this.logger.warn(`createOrg: User not found, uid=${req.owner}`);
            return { error: { message: 'User not found' } };
        }

        memberService.Create({
            oid: String(result.id),
            uid: String(user.user.id),
            role: 'Administrator',
        });

        this.logger.debug(`createOrg: created, id=${result.id}`);
        return { org: Org.fromJSON(result.toJSON()) };
    }

    async deleteOrg(req: DeleteOrgRequest): Promise<DeleteOrgResponse> {
        this.logger.debug(`deleteOrg: oid=${req.oid}, uid=${req.uid}`);
        const result = await this.model.deleteOne({
            _id: req.oid,
            owner: req.uid,
        });

        const memberService = this.memberServiceProvider.getService();
        await memberService.DeleteAll({ oid: req.oid });

        if (result.deletedCount) {
            this.logger.debug(`deleteOrg: deleted, oid=${req.oid}`);
            return { success: true };
        }

        this.logger.warn(`deleteOrg: not deleted, oid=${req.oid}`);
        return { success: false };
    }
}
