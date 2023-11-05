import { MongoDbModule } from '@app/db';
import { OrgIdMiddleware, SharedModule } from '@app/shared';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { OrgHttpController } from './http.controller';
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
    controllers: [OrgController, OrgHttpController],
    providers: [OrgService],
})
export class OrgModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(OrgIdMiddleware).forRoutes(OrgHttpController);
    }
}
