import { MongoModel } from '@app/db';
import { CreateOrg, NotFound, Org, OrgByDomain, OrgById } from '@app/proto';
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { Organisation } from './org.model';

@Injectable()
export class OrgService {
    private readonly logger = new Logger('OrgService');

    constructor(
        @MongoModel('organisation') private model: Model<Organisation>,
    ) {}

    async getOrgById(req: OrgById): Promise<Org | NotFound> {
        this.logger.debug(`getOrgById: uid=${req.uid}, oid=${req.oid}`);
        const result = await this.model.findById(req.oid);

        if (result) {
            return Org.fromJSON(result.toJSON());
        } else {
            this.logger.warn(`getOrgById: not found, oid=${req.oid}`);
            return NotFound.create({ reason: 'Not found' });
        }
    }

    async getOrgByDomain(req: OrgByDomain): Promise<Org | NotFound> {
        this.logger.debug(
            `getOrgByDomain: uid=${req.uid}, domain=${req.domain}`,
        );
        const result = await this.model.findOne({ domain: req.domain });

        if (result) {
            return Org.fromJSON(result.toJSON());
        } else {
            this.logger.warn(`getOrgByDomain: not found, domain=${req.domain}`);
            return NotFound.create({ reason: 'Not found' });
        }
    }

    async createOrg(req: CreateOrg): Promise<Org> {
        this.logger.debug(
            `createOrg: name=${req.name}, domain=${req.domain}, owner=${req.owner}`,
        );

        const result = await this.model.create({
            name: req.name,
            domain: req.domain,
            owner: req.owner,
        });

        this.logger.debug(`createOrg: created, id=${result.id}`);
        return Org.fromJSON(result.toJSON());
    }

    async deleteOrg(req: OrgById): Promise<void> {
        this.logger.debug(`deleteOrg: oid=${req.oid}, uid=${req.uid}`);
        const result = await this.model.deleteOne({
            _id: req.oid,
            owner: req.uid,
        });

        if (result.deletedCount) {
            this.logger.debug(`deleteOrg: deleted, oid=${req.oid}`);
        } else {
            this.logger.warn(`deleteOrg: not deleted, oid=${req.oid}`);
        }
    }
}
