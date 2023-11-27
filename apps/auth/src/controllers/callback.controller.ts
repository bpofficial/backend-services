import { ConnectionServiceProvider, OrgServiceProvider } from '@app/clients';
import { OtoPromise } from '@app/utils';
import { HttpService } from '@nestjs/axios';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';
import { OidcExchangeModel } from '../models/oidc-exchange.model';
import { OidcAuthorizeService } from '../services/oidc.service';

@Controller('auth/callback')
export class CallbackHttpController {
    constructor(
        @InjectModel('oidc-exchange')
        private readonly oidcExchangeModel: Model<OidcExchangeModel>,
        private readonly httpService: HttpService,
        private readonly orgServiceProvider: OrgServiceProvider,
        private readonly connectionServiceProvider: ConnectionServiceProvider,
        private readonly oidcAuthorizeService: OidcAuthorizeService,
    ) {}

    @Get()
    async callback(@Req() req: Request, @Res() res: Response) {
        const url = new URL(req.url);
        const search = url.searchParams;

        const code = search.get('code');
        const state = search.get('state');

        let stateData: Record<string, string>;
        try {
            stateData = JSON.parse(
                Buffer.from(state, 'base64').toString('utf-8'),
            );
        } catch (err) {
            // do something...
        }

        const initialState = stateData.state;
        if (initialState.trim().length) {
            search.set('state', initialState.trim());
        }

        const cid = stateData.cid;
        const connectionService = this.connectionServiceProvider.getService();
        const { connection, error } = await connectionService.GetConnection({
            cid,
        });

        const orgService = this.orgServiceProvider.getService();
        const { org, error: orgError } = await orgService.FindOneById({
            oid: connection.oid,
        });

        if (orgError) {
            //
        }

        const exchange = await this.oidcExchangeModel.findOne({
            id: stateData.eid,
            state: stateData.state,
            nonce: stateData.nonce,
        });

        const tokenUrl = new URL(connection.config.oidc.tokenURL);

        tokenUrl.searchParams.set('code', code);
        tokenUrl.searchParams.set('grant_type', 'authorization_code');
        tokenUrl.searchParams.set('client_id', connection.config.oidc.clientId);
        tokenUrl.searchParams.set(
            'client_secret',
            connection.config.oidc.clientSecret,
        );
        tokenUrl.searchParams.set('redirect_uri', exchange.redirectUri);

        const tokenReq = this.httpService.post(tokenUrl.toString(), null, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const tokenRes = await OtoPromise(tokenReq);

        if (tokenRes.status === 200) {
            const accessToken = tokenRes.data.access_token;
            const idToken = tokenRes.data.id_token;
            const refreshToken = tokenRes.data.refresh_token;

            const tokens = await this.oidcAuthorizeService.storeTokens(
                {
                    accessToken,
                    idToken,
                    refreshToken,
                },
                connection,
            );

            // redirect to client callback url
            const redirectUrl = new URL(org.callbackUrl);
            redirectUrl.searchParams.set(`access_token`, accessToken);
            redirectUrl.searchParams.set(`id_token`, idToken);
            redirectUrl.searchParams.set(`refresh_token`, refreshToken);

            return res.redirect(302, redirectUrl.toString());
        }
    }
}
