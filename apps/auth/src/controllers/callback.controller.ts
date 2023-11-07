import { ConnectionServiceProvider } from '@app/clients';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthorizeService } from '../services/local.service';
import { OidcAuthorizeService } from '../services/oidc.service';
import { MongoModel } from '@app/db';
import { OidcExchangeModel } from '../models/oidc-exchange.model';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { OtoPromise } from '@app/utils';

@Controller('auth/callback')
export class CallbackHttpController {
    constructor(
        @MongoModel('oidc-exchange')
        private readonly oidcExchangeModel: Model<OidcExchangeModel>,
        private readonly httpService: HttpService,
        private readonly connectionServiceProvider: ConnectionServiceProvider,
        private readonly localAuthorizeService: LocalAuthorizeService,
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

            return this.oidcAuthorizeService.storeTokens(
                {
                    accessToken,
                    idToken,
                    refreshToken,
                },
                connection,
            );
        }
    }
}
