import { Controller, Logger } from '@nestjs/common';
import { OrgConfigService } from './org-config.service';

@Controller()
export class OrgConfigGrpcController {
    private readonly logger = new Logger('OrgConfigGrpcController');

    constructor(private readonly orgConfigService: OrgConfigService) {}
}
