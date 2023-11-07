import { MongoDbModule } from '@app/db';
import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { AuthorizeHttpController } from './controllers/authorize.controller';
import { CallbackHttpController } from './controllers/callback.controller';
import { LocalAuthorizeService } from './services/local.service';
import { TokenSchema } from './models/tokens.model';
import { OidcAuthorizeService } from './services/oidc.service';
import { OidcExchangeSchema } from './models/oidc-exchange.model';

@Module({
    imports: [
        SharedModule,
        MongoDbModule.forRoot('service.auth', 'token', TokenSchema),
        MongoDbModule.forRoot(
            'service.auth',
            'oidc-exchange',
            OidcExchangeSchema,
        ),
    ],
    controllers: [AuthorizeHttpController, CallbackHttpController],
    providers: [LocalAuthorizeService, OidcAuthorizeService],
})
export class AuthModule {}
