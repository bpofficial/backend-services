import { MemberServiceProvider, UserServiceProvider } from '@app/clients';
import {
    CreateOrgRequest,
    CreateOrgResponse,
    DeleteOrgResponse,
    Org,
    OrgResponse,
} from '@app/proto/org';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organisation } from './org.model';

@Injectable()
export class OrgService {
    private readonly logger = new Logger('OrgService');

    constructor(
        @InjectModel('organisation') private model: Model<Organisation>,
        private readonly userServiceProvider: UserServiceProvider,
        private readonly memberServiceProvider: MemberServiceProvider,
    ) {}

    async getOrgById(oid: string): Promise<OrgResponse> {
        this.logger.debug(`getOrgById: oid=${oid}`);
        const result = await this.model.findById(oid);

        if (result) {
            return { org: Org.fromJSON(result.toJSON()) };
        } else {
            this.logger.warn(`getOrgById: not found, oid=${oid}`);
            return { error: { message: 'Not found' } };
        }
    }

    async getOrgByDomain(domain: string): Promise<OrgResponse> {
        this.logger.debug(`getOrgByDomain: domain=${domain}`);
        const result = await this.model.findOne({ domain });

        if (result) {
            return { org: Org.fromJSON(result.toJSON()) };
        } else {
            this.logger.warn(`getOrgByDomain: not found, domain=${domain}`);
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

    async deleteOrg(oid: string, uid: string): Promise<DeleteOrgResponse> {
        this.logger.debug(`deleteOrg: oid=${oid}, uid=${uid}`);
        const result = await this.model.deleteOne({
            _id: oid,
            owner: uid,
        });

        const memberService = this.memberServiceProvider.getService();
        await memberService.DeleteAll({ oid });

        if (result.deletedCount) {
            this.logger.debug(`deleteOrg: deleted, oid=${oid}`);
            return { success: true };
        }

        this.logger.warn(`deleteOrg: not deleted, oid=${oid}`);
        return { success: false };
    }
}
