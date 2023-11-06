import { MongoDbModule } from '@app/db';
import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { AuthorizeController } from './authorize.controller';
import { AuthorizeService } from './authorize.service';
import { LocalAuthorizeService } from './local.service';
import { TokenSchema } from './tokens.model';

@Module({
    imports: [
        SharedModule,
        MongoDbModule.forRoot('service.authorize', 'token', TokenSchema),
    ],
    controllers: [AuthorizeController],
    providers: [AuthorizeService, LocalAuthorizeService],
})
export class AuthorizeModule {}
