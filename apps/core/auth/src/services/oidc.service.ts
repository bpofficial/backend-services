import { Connection } from '@app/proto/connection';
import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import * as JWT from 'jsonwebtoken';
import { Model } from 'mongoose';
import { TokenModel } from '../models/tokens.model';

@Injectable()
export class OidcAuthorizeService {
    constructor(
        @InjectModel('token')
        private readonly tokenModel: Model<TokenModel>,
        private readonly configService: ConfigService,
    ) {}

    authorize(request: Request, response: Response, connection: Connection) {
        const url = new URL(request.url);
        const search = url.searchParams;

        const grantType = search.get('grant_type');
        if (grantType === 'authorization_code') {
            return this.authorizationCodeFlow(request, response, connection);
        }

        throw new BadRequestException({
            error: 'unsupported_grant_type',
            error_description:
                'The authorization grant type is not supported by the authorization server or the client.',
        });
    }

    async storeTokens(tokens: Record<string, string>, connection: Connection) {
        const tokenArr = [];
        for (const key in tokens) {
            const payload = JWT.decode(tokens[key]) as JWT.JwtPayload;
            tokenArr.push({
                ...payload,
                type: key,
                token: tokens[key],
                cid: connection.id,
            });
        }

        await this.tokenModel.create(tokenArr);
        return tokens;
    }

    private authorizationCodeFlow(
        request: Request,
        response: Response,
        connection: Connection,
    ) {
        const url = new URL(request.url);
        const search = url.searchParams;

        const initialState = search.get('state');
        const state = JSON.stringify({
            cid: connection.id,
            state: initialState,
        });

        search.set('state', Buffer.from(state, 'utf-8').toString('base64'));

        // Overwrite the connection id with the actual oidc client id
        search.set('client_id', connection.config.oidc.clientId);

        const redirectUri = this.configService.get('url');
        if (!redirectUri) {
            throw new InternalServerErrorException();
        }

        const redirectUrl = new URL(redirectUri);
        redirectUrl.pathname = `/api/v1/auth/callback`;
        search.set('redirect_uri', redirectUrl.toString());

        // redirect to the oidc authorize endpoint
        const authorizationUrl = new URL(
            connection.config.oidc.authorizationURL,
        );

        authorizationUrl.search = search.toString();

        return response.redirect(302, authorizationUrl.toString());
    }
}
