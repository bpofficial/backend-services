import { Org, OrgById } from '@app/proto';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class OrgService {
    private readonly logger = new Logger('OrgService');

    async getOrgById(req: OrgById): Promise<Org> {
        this.logger.debug(`getOrgById: uid=${req.uid}, oid=${req.oid}`);
        return {
            id: req.oid,
            name: 'test',
        };
    }
}
