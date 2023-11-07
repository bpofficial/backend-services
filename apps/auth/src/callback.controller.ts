import { ConnectionServiceProvider } from '@app/clients';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthorizeService } from './local.service';
import { OidcAuthorizeService } from './oidc.service';

@Controller('auth/callback')
export class CallbackHttpController {
    constructor(
        private readonly connectionServiceProvider: ConnectionServiceProvider,
        private readonly localAuthorizeService: LocalAuthorizeService,
        private readonly oidcAuthorizeService: OidcAuthorizeService,
    ) {}

    @Get()
    async callback(@Req() req: Request, @Res() res: Response) {
        const url = new URL(req.url);
        const search = url.searchParams;

        const state = search.get('state');

        let stateData: Record<string, string>;
        try {
            stateData = JSON.parse(
                Buffer.from(state, 'base64').toString('ascii'),
            );
        } catch (err) {
            // do something...
        }

        const cid = stateData.cid;

        const connectionService = this.connectionServiceProvider.getService();
        const connection = await connectionService.GetConnection({ cid });
    }
}
