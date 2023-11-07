import { ConnectionServiceProvider } from '@app/clients';
import { ConnectionType } from '@app/proto/connection';
import {
    BadRequestException,
    Controller,
    NotImplementedException,
    Post,
    Req,
    Res,
} from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthorizeService } from '../services/local.service';
import { OidcAuthorizeService } from '../services/oidc.service';

@Controller('auth/authorize')
export class AuthorizeHttpController {
    constructor(
        private readonly connectionServiceProvider: ConnectionServiceProvider,
        private readonly localAuthorizeService: LocalAuthorizeService,
        private readonly oidcAuthorizeService: OidcAuthorizeService,
    ) {}

    @Post()
    async authorizePost(@Req() req: Request, @Res() res: Response) {
        const url = new URL(req.url);
        const search = url.searchParams;

        const clientId = search.get('client_id');
        const connectionService = this.connectionServiceProvider.getService();
        const { connection, error } = await connectionService.GetConnection({
            cid: clientId,
        });

        if (error) {
            throw new BadRequestException({
                error: 'invalid_client',
                error_description:
                    'Client authentication failed (e.g., unknown client, no client authentication included, or unsupported authentication method).',
            });
        }

        switch (connection.type) {
            case ConnectionType.LOCAL:
                return this.localAuthorizeService.authorize(req, connection);
            case ConnectionType.OIDC:
                return this.oidcAuthorizeService.authorize(
                    req,
                    res,
                    connection,
                );
        }

        throw new NotImplementedException();
    }
}
