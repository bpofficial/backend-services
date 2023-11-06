import { ConnectionServiceProvider } from '@app/clients';
import { ConnectionType } from '@app/proto/connection';
import { Controller, Get, Post, Request } from '@nestjs/common';
import { LocalAuthorizeService } from './local.service';

@Controller(`authorize`)
export class AuthorizeController {
    constructor(
        private readonly connectionServiceProvider: ConnectionServiceProvider,
        private readonly localAuthorizeService: LocalAuthorizeService,
    ) {}

    @Get()
    authorizeGet() {
        //
    }

    @Post()
    async authorizePost(@Request() req: Request) {
        const url = new URL(req.url);
        const search = url.searchParams;

        const clientId = search.get('client_id');
        const connectionService = this.connectionServiceProvider.getService();
        const { connection, error } = await connectionService.GetConnection({
            cid: clientId,
        });

        if (error) {
            //
        }

        switch (connection.type) {
            case ConnectionType.LOCAL:
                return this.localAuthorizeService.authorize(req, connection);
        }

        return {
            error: '',
        };

        // other OpenID Authorize params
        // Allows redirecting to the connection's (by cid)
        // OIDC endpoint if that's the auth method, or
        // if the auth method method is something like
        // client credentials then allow signin with the
        // connection via those if that's the connection type.

        // Essentially need to discern what to do and forward the
        // request to OIDC if necessary, otherwise handle it locally.
    }
}
