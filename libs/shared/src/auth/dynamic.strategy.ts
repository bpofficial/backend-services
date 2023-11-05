import { SettingsServiceProvider, UserServiceProvider } from '@app/clients';
import { Injectable } from '@nestjs/common';
import { Strategy as LocalStrategy } from 'passport-local';
import OidcStrategy, { Profile, VerifyCallback } from 'passport-openidconnect';

@Injectable()
export class DynamicStrategyService {
    constructor(
        private readonly settingsServiceProvider: SettingsServiceProvider,
        private readonly userServiceProvider: UserServiceProvider,
    ) {}

    async createStrategy(oid: string) {
        const settingsService = this.settingsServiceProvider.getService();
        const { config, error } = await settingsService.GetAuthConfig({ oid });

        if (error) {
            return null;
        }

        if (config.oidc) {
            return new OidcStrategy(
                {
                    clientID: config.oidc.clientId,
                    clientSecret: config.oidc.clientSecret,
                    issuer: config.oidc.issuer,
                    authorizationURL: config.oidc.authorizationURL,
                    tokenURL: config.oidc.tokenURL,
                    callbackURL: config.oidc.callbackURL,
                    userInfoURL: config.oidc.userInfoURL,
                },
                (
                    _issuer: string,
                    _profile: Profile,
                    _context: object,
                    _idToken: string | object,
                    accessToken: object,
                    _refreshToken: string,
                    done: VerifyCallback,
                ) => {
                    done(null, {
                        oid: accessToken['oid'],
                        uid: accessToken['uid'],
                        mid: accessToken['mid'],
                    });
                },
            );
        } else if (config.credentials) {
            const userService = this.userServiceProvider.getService();
            return new LocalStrategy(async (email, password, done) => {
                const { user, error } = await userService.GetUserByEmail({
                    email,
                });

                if (!user) {
                    return done(null, false);
                }

                if (!user.verifyPassword(password)) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }
    }
}
