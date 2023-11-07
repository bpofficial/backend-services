import { Connection } from '@app/proto/connection';
import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class OidcAuthorizeService {
    constructor(private readonly configService: ConfigService) {}

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

    private authorizationCodeFlow(
        request: Request,
        response: Response,
        connection: Connection,
    ) {
        const url = new URL(request.url);
        const search = url.searchParams;

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

        return response.redirect(authorizationUrl.toString());
    }
}
