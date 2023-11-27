import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrganisationConfig } from './org-config.model';

@Injectable()
export class OrgConfigService {
    private readonly logger = new Logger('OrgService');

    constructor(
        @InjectModel('organisation-config')
        private model: Model<OrganisationConfig>,
    ) {}
}
