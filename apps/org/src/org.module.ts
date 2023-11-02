import { MongoDbModule } from '@app/db';
import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { OrgController } from './org.controller';
import { OrganisationSchema } from './org.model';
import { OrgService } from './org.service';

@Module({
    imports: [
        SharedModule,
        MongoDbModule.forRoot(
            'service.org',
            'organisation',
            OrganisationSchema,
        ),
    ],
    controllers: [OrgController],
    providers: [OrgService],
})
export class OrgModule {}
