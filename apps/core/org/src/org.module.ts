import { MongoDbModule } from '@app/db';
import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { OrgGrpcController } from './grpc.controller';
import { OrgHttpController } from './http.controller';
import { OrganisationSchema } from './org.model';
import { OrgService } from './org.service';

@Module({
    imports: [
        SharedModule,
        MongoDbModule.forRoot('service.org', {
            organisation: OrganisationSchema,
        }),
    ],
    controllers: [OrgGrpcController, OrgHttpController],
    providers: [OrgService],
})
export class OrgModule {}
