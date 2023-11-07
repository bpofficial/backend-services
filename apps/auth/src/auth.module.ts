import { MongoDbModule } from '@app/db';
import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { AuthorizeHttpController } from './authorize.controller';
import { AuthorizeService } from './authorize.service';
import { CallbackHttpController } from './callback.controller';
import { LocalAuthorizeService } from './local.service';
import { TokenSchema } from './tokens.model';

@Module({
    imports: [
        SharedModule,
        MongoDbModule.forRoot('service.auth', 'token', TokenSchema),
    ],
    controllers: [AuthorizeHttpController, CallbackHttpController],
    providers: [AuthorizeService, LocalAuthorizeService],
})
export class AuthModule {}
