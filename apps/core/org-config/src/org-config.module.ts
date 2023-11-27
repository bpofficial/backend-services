import { MongoDbModule } from '@app/db';
import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { OrgConfigGrpcController } from './grpc.controller';
import { OrgConfigHttpController } from './http.controller';
import { OrganisationConfigSchema } from './org-config.model';
import { OrgConfigService } from './org-config.service';

@Module({
    imports: [
        SharedModule,
        MongoDbModule.forRoot('service.org', {
            'organisation-config': OrganisationConfigSchema,
        }),
    ],
    controllers: [OrgConfigGrpcController, OrgConfigHttpController],
    providers: [OrgConfigService],
})
export class OrgConfigModule {}
