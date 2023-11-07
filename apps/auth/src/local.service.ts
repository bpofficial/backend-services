import { AccountServiceProvider } from '@app/clients';
import { MongoModel } from '@app/db';
import { Account } from '@app/proto/account';
import { Connection } from '@app/proto/connection';
import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import JWT from 'jsonwebtoken';
import { Model } from 'mongoose';
import { TokenModel } from './tokens.model';

@Injectable()
export class LocalAuthorizeService {
    constructor(
        private readonly accountServiceProvider: AccountServiceProvider,
        @MongoModel('token') private tokenModel: Model<TokenModel>,
    ) {}

    async createAccessToken(account: Account, connection: Connection) {
        const accessToken = {
            sub: account.id,
            exp: Date.now() + connection.token.expiry * 1000,
            iat: Date.now(),
            aud: connection.token.audience,
            iss: connection.token.issuer,
            jti: randomBytes(16).toString('hex'),
        };

        const atJwt = JWT.sign(accessToken, connection.token.secret);

        const refreshToken = {
            sub: account.id,
            exp: Date.now() + connection.token.refreshExpiry * 1000,
            iat: Date.now(),
            aud: connection.token.audience,
            iss: connection.token.issuer,
            jti: randomBytes(16).toString('hex'),
        };

        const rtJwt = JWT.sign(refreshToken, connection.token.secret);

        const session = await this.tokenModel.startSession();
        session.startTransaction();

        const tokens = [
            {
                aid: account.id,
                cid: connection.id,
                ...accessToken,
                jwt: atJwt,
            },
        ];

        if (connection.token.refresh) {
            tokens.push({
                aid: account.id,
                cid: connection.id,
                ...refreshToken,
                jwt: rtJwt,
            });
        }

        await this.tokenModel.create(tokens, { session });
        await session.endSession();

        return {
            access_token: atJwt,
            token_type: 'Bearer',
            expires_in: connection.token.expiry,
            refresh_token: connection.token.refresh ? rtJwt : undefined,
            scope: 'basic',
        };
    }

    async revokeToken(aid: string, jti: string) {
        await this.tokenModel.updateOne({ aid, jti }, { revoked: true });
    }

    async authorize(request: Request, connection: Connection) {
        const url = new URL(request.url);
        const search = url.searchParams;

        const grantType = search.get('grant_type');
        const username = search.get('username')?.trim?.();
        const password = search.get('password')?.trim?.();

        if (grantType !== 'password') {
            throw new BadRequestException({
                error: 'unsupported_grant_type',
                error_description:
                    'The authorization grant type is not supported by the authorization server or the client.',
            });
        }

        const accountService = this.accountServiceProvider.getService();
        const { account } = await accountService.ValidatePassword({
            username,
            password,
            cid: connection.id,
        });

        if (account) {
            return this.createAccessToken(account, connection);
        }

        throw new BadRequestException({
            error: 'invalid_grant',
            error_description:
                'The provided authorization grant (e.g., authorization code, resource owner credentials) or refresh token is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client.',
        });
    }
}
